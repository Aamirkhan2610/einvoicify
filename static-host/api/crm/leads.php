<?php
require_once dirname(__DIR__, 2) . '/includes/auth.php';
require_once dirname(__DIR__, 2) . '/includes/db.php';

require_crm_session();
$pdo = db();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $enquiries = $pdo->query('SELECT id, name, email, phone, company, message, type, status, source, notes, created_at AS createdAt FROM contact_enquiries ORDER BY created_at DESC LIMIT 200')->fetchAll();
    $demos = $pdo->query('SELECT id, name, email, phone, company, job_title AS jobTitle, erp_system AS erpSystem, notes, status, created_at AS createdAt FROM demo_requests ORDER BY created_at DESC LIMIT 200')->fetchAll();
    json_response(['enquiries' => $enquiries, 'demos' => $demos]);
}

if ($method === 'PATCH') {
    $body = read_json_body();
    $id = trim((string) ($body['id'] ?? ''));
    $kind = trim((string) ($body['kind'] ?? 'enquiry'));
    $status = strtoupper(trim((string) ($body['status'] ?? '')));
    $allowed = ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'CLOSED'];
    if ($id === '' || !in_array($status, $allowed, true)) {
        json_response(['error' => 'Invalid request'], 400);
    }
    $now = now_iso();
    if ($kind === 'demo') {
        $st = $pdo->prepare('UPDATE demo_requests SET status = ?, updated_at = ? WHERE id = ?');
        $st->execute([$status, $now, $id]);
    } else {
        $st = $pdo->prepare('UPDATE contact_enquiries SET status = ?, updated_at = ? WHERE id = ?');
        $st->execute([$status, $now, $id]);
    }
    json_response(['success' => true]);
}

json_response(['error' => 'Method not allowed'], 405);
