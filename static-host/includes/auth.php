<?php
require_once __DIR__ . '/config.php';

function b64url_encode(string $data): string
{
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function b64url_decode(string $data): string|false
{
    $remainder = strlen($data) % 4;
    if ($remainder) {
        $data .= str_repeat('=', 4 - $remainder);
    }
    return base64_decode(strtr($data, '-_', '+/'));
}

function create_signed_session(string $email, string $name): array
{
    $expiresAt = time() + (CRM_SESSION_DAYS * 86400);
    $body = b64url_encode(json_encode([
        'email' => $email,
        'name' => $name,
        'exp' => $expiresAt,
    ], JSON_UNESCAPED_UNICODE));
    $sig = b64url_encode(hash_hmac('sha256', $body, CRM_AUTH_SECRET, true));
    return [
        'token' => $body . '.' . $sig,
        'expiresAt' => $expiresAt,
    ];
}

function verify_signed_session(string $token): ?array
{
    $parts = explode('.', $token);
    if (count($parts) !== 2) {
        return null;
    }
    [$body, $sig] = $parts;
    $expected = b64url_encode(hash_hmac('sha256', $body, CRM_AUTH_SECRET, true));
    if (!hash_equals($expected, $sig)) {
        return null;
    }
    $raw = b64url_decode($body);
    if ($raw === false) {
        return null;
    }
    $data = json_decode($raw, true);
    if (!is_array($data) || empty($data['email']) || empty($data['name']) || empty($data['exp'])) {
        return null;
    }
    if ((int) $data['exp'] < time()) {
        return null;
    }
    return [
        'email' => (string) $data['email'],
        'name' => (string) $data['name'],
    ];
}

function set_crm_cookie(string $token, int $expiresAt): void
{
    $secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
    setcookie(CRM_SESSION_COOKIE, $token, [
        'expires' => $expiresAt,
        'path' => '/',
        'secure' => $secure,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

function clear_crm_cookie(): void
{
    setcookie(CRM_SESSION_COOKIE, '', [
        'expires' => time() - 3600,
        'path' => '/',
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

function get_crm_session(): ?array
{
    $token = $_COOKIE[CRM_SESSION_COOKIE] ?? '';
    if ($token === '') {
        return null;
    }
    $user = verify_signed_session($token);
    if (!$user) {
        return null;
    }
    return [
        'token' => $token,
        'admin' => [
            'id' => 'env-admin',
            'email' => $user['email'],
            'name' => $user['name'],
        ],
    ];
}

function require_crm_session(): array
{
    $session = get_crm_session();
    if (!$session) {
        json_response(['error' => 'Unauthorized'], 401);
    }
    return $session;
}
