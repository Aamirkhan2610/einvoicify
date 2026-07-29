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
$jobTitle = trim((string) ($body['jobTitle'] ?? ''));
$erp = trim((string) ($body['erpSystem'] ?? ''));
$monthly = trim((string) ($body['monthlyInvoices'] ?? ''));
$turnover = trim((string) ($body['turnoverBand'] ?? ''));
$notes = trim((string) ($body['notes'] ?? ''));

$details = [];
if ($name === '' || strlen($name) < 2) $details['name'] = ['Name is required'];
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $details['email'] = ['Valid email is required'];
if ($company === '') $details['company'] = ['Company is required'];
if ($details) {
    json_response(['error' => 'Validation failed', 'details' => $details], 400);
}

$id = cuid();
$now = now_iso();
$pdo = db();

$st = $pdo->prepare('INSERT INTO demo_requests
  (id, name, email, phone, company, job_title, erp_system, monthly_invoices, turnover_band, notes, status, source, ip_address, user_agent, created_at, updated_at)
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
$st->execute([
    $id, $name, $email,
    $phone !== '' ? $phone : null,
    $company,
    $jobTitle !== '' ? $jobTitle : null,
    $erp !== '' ? $erp : null,
    $monthly !== '' ? $monthly : null,
    $turnover !== '' ? $turnover : null,
    $notes !== '' ? $notes : null,
    'NEW', 'DEMO_REQUEST', client_ip(), client_ua(), $now, $now,
]);

// Also mirror into enquiries for unified CRM lead list
$eid = cuid();
$st2 = $pdo->prepare('INSERT INTO contact_enquiries
  (id, name, email, phone, company, message, type, status, source, turnover_band, erp_system, ip_address, user_agent, created_at, updated_at)
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
$st2->execute([
    $eid, $name, $email,
    $phone !== '' ? $phone : null,
    $company,
    $notes !== '' ? $notes : 'Demo request',
    'DEMO', 'NEW', 'DEMO_REQUEST',
    $turnover !== '' ? $turnover : null,
    $erp !== '' ? $erp : null,
    client_ip(), client_ua(), $now, $now,
]);

json_response(['success' => true, 'id' => $id, 'message' => 'Demo request received'], 201);
