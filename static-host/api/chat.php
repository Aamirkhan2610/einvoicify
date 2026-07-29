<?php
require_once dirname(__DIR__) . '/includes/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = db();

if ($method === 'GET') {
    $sessionId = trim((string) ($_GET['sessionId'] ?? ''));
    if ($sessionId === '') {
        json_response(['error' => 'sessionId is required'], 400);
    }
    $st = $pdo->prepare('SELECT * FROM conversations WHERE session_id = ?');
    $st->execute([$sessionId]);
    $conv = $st->fetch();
    if (!$conv) {
        json_response(['error' => 'Conversation not found'], 404);
    }
    $ms = $pdo->prepare('SELECT id, conversation_id AS conversationId, sender, body, agent_name AS agentName, created_at AS createdAt FROM messages WHERE conversation_id = ? ORDER BY created_at ASC');
    $ms->execute([$conv['id']]);
    $messages = $ms->fetchAll();
    json_response([
        'sessionId' => $conv['session_id'],
        'status' => $conv['status'],
        'messages' => $messages,
        'visitorName' => $conv['visitor_name'],
        'topic' => $conv['topic'],
    ]);
}

if ($method !== 'POST') {
    json_response(['error' => 'Method not allowed'], 405);
}

$body = read_json_body();
$isFollowUp = !empty($body['sessionId']) && !empty($body['body']) && empty($body['message']);

if ($isFollowUp) {
    $sessionId = trim((string) $body['sessionId']);
    $text = trim((string) $body['body']);
    if (strlen($text) < 1) {
        json_response(['error' => 'Validation failed'], 400);
    }
    $st = $pdo->prepare('SELECT * FROM conversations WHERE session_id = ?');
    $st->execute([$sessionId]);
    $conv = $st->fetch();
    if (!$conv) {
        json_response(['error' => 'Conversation not found'], 404);
    }
    if ($conv['status'] === 'CLOSED') {
        json_response(['error' => 'This conversation is closed. Please start a new chat.'], 400);
    }
    $now = now_iso();
    $mid = cuid();
    $ins = $pdo->prepare('INSERT INTO messages (id, conversation_id, sender, body, created_at) VALUES (?,?,?,?,?)');
    $ins->execute([$mid, $conv['id'], 'CUSTOMER', $text, $now]);
    $status = $conv['status'] === 'RESOLVED' ? 'OPEN' : $conv['status'];
    $upd = $pdo->prepare('UPDATE conversations SET last_message_at = ?, status = ?, updated_at = ? WHERE id = ?');
    $upd->execute([$now, $status, $now, $conv['id']]);
    json_response([
        'success' => true,
        'message' => [
            'id' => $mid,
            'sender' => 'CUSTOMER',
            'body' => $text,
            'createdAt' => $now,
        ],
    ]);
}

// Start / continue conversation with intro form
$name = trim((string) ($body['name'] ?? ''));
$email = strtolower(trim((string) ($body['email'] ?? '')));
$phone = trim((string) ($body['phone'] ?? ''));
$company = trim((string) ($body['company'] ?? ''));
$topic = trim((string) ($body['topic'] ?? ''));
$message = trim((string) ($body['message'] ?? ''));
$sessionId = trim((string) ($body['sessionId'] ?? ''));

$details = [];
if ($name === '' || strlen($name) < 2) $details['name'] = ['Name is required'];
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $details['email'] = ['Valid email is required'];
if ($message === '' || strlen($message) < 2) $details['message'] = ['Message is required'];
if ($details) {
    json_response(['error' => 'Validation failed', 'details' => $details], 400);
}

if ($sessionId === '' || strlen($sessionId) < 8) {
    $sessionId = bin2hex(random_bytes(16));
}

$isPrice = (stripos($topic, 'pric') !== false) || (stripos($message, 'pric') !== false);
$now = now_iso();

$st = $pdo->prepare('SELECT * FROM conversations WHERE session_id = ?');
$st->execute([$sessionId]);
$conv = $st->fetch();

if (!$conv) {
    $cid = cuid();
    $ins = $pdo->prepare('INSERT INTO conversations
      (id, session_id, visitor_name, visitor_email, visitor_phone, company, topic, status, source, last_message_at, ip_address, user_agent, created_at, updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
    $ins->execute([
        $cid, $sessionId, $name, $email,
        $phone !== '' ? $phone : null,
        $company !== '' ? $company : null,
        $topic !== '' ? $topic : null,
        'OPEN', $isPrice ? 'PRICE_INQUIRY' : 'CHAT',
        $now, client_ip(), client_ua(), $now, $now,
    ]);

    $sys = 'Thanks for contacting Einvoicify. Our team typically replies within business hours. You can also call +6016-338-1871 or email info@einvoicify.my.';
    $m1 = cuid();
    $m2 = cuid();
    $msg = $pdo->prepare('INSERT INTO messages (id, conversation_id, sender, body, created_at) VALUES (?,?,?,?,?)');
    $msg->execute([$m1, $cid, 'SYSTEM', $sys, $now]);
    $msg->execute([$m2, $cid, 'CUSTOMER', $message, $now]);

    $eid = cuid();
    $en = $pdo->prepare('INSERT INTO contact_enquiries
      (id, name, email, phone, company, message, type, status, source, ip_address, user_agent, created_at, updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)');
    $en->execute([
        $eid, $name, $email,
        $phone !== '' ? $phone : null,
        $company !== '' ? $company : null,
        '[Chat · ' . ($topic !== '' ? $topic : 'General') . '] ' . $message,
        $isPrice ? 'PRICE' : 'PRODUCT',
        'NEW',
        $isPrice ? 'PRICE_INQUIRY' : 'CHAT',
        client_ip(), client_ua(), $now, $now,
    ]);
} else {
    $cid = $conv['id'];
    $mid = cuid();
    $msg = $pdo->prepare('INSERT INTO messages (id, conversation_id, sender, body, created_at) VALUES (?,?,?,?,?)');
    $msg->execute([$mid, $cid, 'CUSTOMER', $message, $now]);
    $upd = $pdo->prepare('UPDATE conversations SET last_message_at=?, visitor_name=?, visitor_email=?, visitor_phone=?, company=?, topic=?, status=?, updated_at=? WHERE id=?');
    $upd->execute([
        $now, $name, $email,
        $phone !== '' ? $phone : $conv['visitor_phone'],
        $company !== '' ? $company : $conv['company'],
        $topic !== '' ? $topic : $conv['topic'],
        'OPEN', $now, $cid,
    ]);
}

$ms = $pdo->prepare('SELECT id, conversation_id AS conversationId, sender, body, agent_name AS agentName, created_at AS createdAt FROM messages WHERE conversation_id = ? ORDER BY created_at ASC');
$ms->execute([$cid]);
$messages = $ms->fetchAll();

json_response([
    'success' => true,
    'sessionId' => $sessionId,
    'conversationId' => $cid,
    'messages' => $messages,
], 201);
