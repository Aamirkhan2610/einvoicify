<?php
require_once dirname(__DIR__, 2) . '/includes/auth.php';

$session = get_crm_session();
if (!$session) {
    json_response(['error' => 'Unauthorized'], 401);
}
json_response(['admin' => $session['admin']]);
