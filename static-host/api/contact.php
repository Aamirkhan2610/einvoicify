<?php
require_once dirname(__DIR__) . '/includes/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed'], 405);
}

$body = read_json_body();
$name = trim((string) ($body['name'] ?? ''));
$email = strtolower(trim((string) ($body['email'] ?? '')));
$phone = trim((string) ($body['phone'] ?? ''));
$company = trim((string) ($body['company'] ?? ''));
$message = trim((string) ($body['message'] ?? ''));
$type = strtoupper(trim((string) ($body['type'] ?? 'GENERAL')));
$turnover = trim((string) ($body['turnoverBand'] ?? ''));
$erp = trim((string) ($body['erpSystem'] ?? ''));

$details = [];
if ($name === '' || strlen($name) < 2) $details['name'] = ['Name is required'];
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $details['email'] = ['Valid email is required'];
if ($message === '' || strlen($message) < 5) $details['message'] = ['Message is required'];
if ($details) {
    json_response(['error' => 'Validation failed', 'details' => $details], 400);
}

$allowed = ['GENERAL', 'DEMO', 'PRICE', 'PRODUCT', 'SUPPORT', 'INTEGRATION'];
if (!in_array($type, $allowed, true)) $type = 'GENERAL';

$source = 'CONTACT_FORM';
if ($type === 'PRICE') $source = 'PRICE_INQUIRY';
if ($type === 'DEMO') $source = 'DEMO_REQUEST';

$id = cuid();
$now = now_iso();
$pdo = db();
$st = $pdo->prepare('INSERT INTO contact_enquiries
  (id, name, email, phone, company, message, type, status, source, turnover_band, erp_system, ip_address, user_agent, created_at, updated_at)
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
$st->execute([
    $id,
    $name,
    $email,
    $phone !== '' ? $phone : null,
    $company !== '' ? $company : null,
    $message,
    $type,
    'NEW',
    $source,
    $turnover !== '' ? $turnover : null,
    $erp !== '' ? $erp : null,
    client_ip(),
    client_ua(),
    $now,
    $now,
]);

json_response(['success' => true, 'id' => $id, 'message' => 'Enquiry received'], 201);
