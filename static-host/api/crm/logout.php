<?php
require_once dirname(__DIR__, 2) . '/includes/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed'], 405);
}

clear_crm_cookie();
json_response(['success' => true]);
