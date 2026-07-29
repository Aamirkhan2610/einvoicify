<?php
require_once dirname(__DIR__, 2) . '/includes/auth.php';
require_once dirname(__DIR__, 2) . '/includes/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed'], 405);
}

// ensure DB ready
db();

$body = read_json_body();
$email = strtolower(trim((string) ($body['email'] ?? '')));
$password = (string) ($body['password'] ?? '');

if ($email === '' || $password === '') {
    json_response(['error' => 'Invalid email or password'], 400);
}

if ($email !== CRM_ADMIN_EMAIL || !hash_equals(CRM_ADMIN_PASSWORD, $password)) {
    json_response(['error' => 'Invalid email or password'], 401);
}

$session = create_signed_session(CRM_ADMIN_EMAIL, CRM_ADMIN_NAME);
set_crm_cookie($session['token'], $session['expiresAt']);

json_response([
    'success' => true,
    'admin' => [
        'id' => 'env-admin',
        'email' => CRM_ADMIN_EMAIL,
        'name' => CRM_ADMIN_NAME,
    ],
]);
