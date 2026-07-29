<?php
/**
 * Einvoicify static host config — Windows / IIS + PHP compatible
 * Override via environment variables or edit values below.
 */

// Set to '' if this folder is the site root (e.g. www.iosmalaysia.com)
// Set to '/subfolder' if deployed under a path
define('BASE_PATH', '');

define('SITE_NAME', 'Einvoicify');
define('LEGAL_NAME', 'Integrated Operation Solutions Sdn. Bhd.');
define('REGISTRATION_NO', '947729-A');
define('COMPANY_BRAND', 'IOS Malaysia');
define('PRODUCT_URL', getenv('PRODUCT_URL') ?: 'https://app.einvoicify.my');
define('SITE_URL', getenv('SITE_URL') ?: 'https://www.iosmalaysia.com');
define('LEGACY_SITE', 'http://iosmalaysia.com');

define('CONTACT_EMAIL', 'info@einvoicify.my');
define('GENERAL_EMAIL', 'admin@iosmalaysia.com');
define('CONTACT_PHONE', '+6016-338-1871');
define('CONTACT_PHONE_HREF', 'tel:+60163381871');
define('ADDRESS_FULL', 'Capital 5, Oasis Square, No. 2, Jalan PJU 1A/7A, Oasis Damansara, 47301 Petaling Jaya, Selangor D.E., Malaysia');
define('ADDRESS_LINE1', 'Capital 5, Oasis Square');
define('ADDRESS_LINE2', 'No. 2, Jalan PJU 1A/7A, Oasis Damansara');
define('ADDRESS_CITY', '47301 Petaling Jaya, Selangor D.E.');

// CRM credentials — change before production
define('CRM_ADMIN_EMAIL', strtolower(getenv('CRM_ADMIN_EMAIL') ?: 'admin@einvoicify.my'));
define('CRM_ADMIN_PASSWORD', getenv('CRM_ADMIN_PASSWORD') ?: 'einvoicify2026');
define('CRM_ADMIN_NAME', getenv('CRM_ADMIN_NAME') ?: 'Einvoicify Admin');
define('CRM_AUTH_SECRET', getenv('CRM_AUTH_SECRET') ?: 'change-me-to-a-long-random-secret');
define('CRM_SESSION_COOKIE', 'einvoicify_crm_session');
define('CRM_SESSION_DAYS', 7);

define('DB_PATH', dirname(__DIR__) . '/data/einvoicify.sqlite');

date_default_timezone_set('Asia/Kuala_Lumpur');

function base_url(string $path = ''): string
{
    $base = rtrim(BASE_PATH, '/');
    $path = ltrim($path, '/');
    if ($path === '') {
        return $base === '' ? '/' : $base . '/';
    }
    return ($base === '' ? '' : $base) . '/' . $path;
}

function asset_url(string $path): string
{
    return base_url('assets/' . ltrim($path, '/'));
}

function api_url(string $path): string
{
    return base_url('api/' . ltrim($path, '/'));
}

function json_response($data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function read_json_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function client_ip(): ?string
{
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $parts = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        return trim($parts[0]);
    }
    return $_SERVER['HTTP_X_REAL_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? null;
}

function client_ua(): ?string
{
    return $_SERVER['HTTP_USER_AGENT'] ?? null;
}

function cuid(): string
{
    return bin2hex(random_bytes(12));
}

function h(?string $s): string
{
    return htmlspecialchars((string) $s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

require_once __DIR__ . '/icons.php';
