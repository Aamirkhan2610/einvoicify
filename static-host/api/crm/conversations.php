<?php
require_once dirname(__DIR__, 2) . '/includes/auth.php';
require_once dirname(__DIR__, 2) . '/includes/db.php';

$session = require_crm_session();
$pdo = db();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $id = trim((string) ($_GET['id'] ?? ''));
    if ($id !== '') {
        $st = $pdo->prepare('SELECT id, session_id AS sessionId, visitor_name AS visitorName, visitor_email AS visitorEmail, visitor_phone AS visitorPhone, company, topic, status, last_message_at AS lastMessageAt, created_at AS createdAt FROM conversations WHERE id = ?');
        $st->execute([$id]);
        $conv = $st->fetch();
        if (!$conv) {
            json_response(['error' => 'Not found'], 404);
        }
        $ms = $pdo->prepare('SELECT id, sender, body, agent_name AS agentName, created_at AS createdAt FROM messages WHERE conversation_id = ? ORDER BY created_at ASC');
        $ms->execute([$id]);
        $conv['messages'] = $ms->fetchAll();
        json_response(['conversation' => $conv]);
    }

    $rows = $pdo->query('SELECT id, session_id AS sessionId, visitor_name AS visitorName, visitor_email AS visitorEmail, visitor_phone AS visitorPhone, company, topic, status, last_message_at AS lastMessageAt FROM conversations ORDER BY last_message_at DESC LIMIT 100')->fetchAll();
    foreach ($rows as &$r) {
        $c = $pdo->prepare('SELECT COUNT(*) FROM messages WHERE conversation_id = ?');
        $c->execute([$r['id']]);
        $r['_count'] = ['messages' => (int) $c->fetchColumn()];
    }
    unset($r);
    json_response(['conversations' => $rows]);
}

if ($method === 'POST') {
    $body = read_json_body();
    $conversationId = trim((string) ($body['conversationId'] ?? ''));
    $text = trim((string) ($body['body'] ?? ''));
    if ($conversationId === '' || $text === '') {
        json_response(['error' => 'Invalid request'], 400);
    }
    $st = $pdo->prepare('SELECT id, status FROM conversations WHERE id = ?');
    $st->execute([$conversationId]);
    $conv = $st->fetch();
    if (!$conv) {
        json_response(['error' => 'Not found'], 404);
    }
    $now = now_iso();
    $mid = cuid();
    $agentName = $session['admin']['name'];
    $ins = $pdo->prepare('INSERT INTO messages (id, conversation_id, sender, body, agent_name, created_at) VALUES (?,?,?,?,?,?)');
    $ins->execute([$mid, $conversationId, 'AGENT', $text, $agentName, $now]);
    $upd = $pdo->prepare("UPDATE conversations SET last_message_at = ?, status = CASE WHEN status = 'CLOSED' THEN 'OPEN' ELSE status END, updated_at = ? WHERE id = ?");
    $upd->execute([$now, $now, $conversationId]);
    json_response([
        'success' => true,
        'message' => [
            'id' => $mid,
            'sender' => 'AGENT',
            'body' => $text,
            'agentName' => $agentName,
            'createdAt' => $now,
        ],
    ]);
}

if ($method === 'PATCH') {
    $body = read_json_body();
    $id = trim((string) ($body['id'] ?? ''));
    $status = strtoupper(trim((string) ($body['status'] ?? '')));
    $allowed = ['OPEN', 'PENDING', 'RESOLVED', 'CLOSED'];
    if ($id === '' || !in_array($status, $allowed, true)) {
        json_response(['error' => 'Invalid request'], 400);
    }
    $now = now_iso();
    $st = $pdo->prepare('UPDATE conversations SET status = ?, updated_at = ? WHERE id = ?');
    $st->execute([$status, $now, $id]);
    json_response(['success' => true]);
}

json_response(['error' => 'Method not allowed'], 405);
