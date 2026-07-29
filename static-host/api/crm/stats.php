<?php
require_once dirname(__DIR__, 2) . '/includes/auth.php';
require_once dirname(__DIR__, 2) . '/includes/db.php';

require_crm_session();
$pdo = db();

$enquiriesNew = (int) $pdo->query("SELECT COUNT(*) FROM contact_enquiries WHERE status = 'NEW'")->fetchColumn();
$enquiriesTotal = (int) $pdo->query('SELECT COUNT(*) FROM contact_enquiries')->fetchColumn();
$demosNew = (int) $pdo->query("SELECT COUNT(*) FROM demo_requests WHERE status = 'NEW'")->fetchColumn();
$demosTotal = (int) $pdo->query('SELECT COUNT(*) FROM demo_requests')->fetchColumn();
$chatsOpen = (int) $pdo->query("SELECT COUNT(*) FROM conversations WHERE status IN ('OPEN','PENDING')")->fetchColumn();
$chatsTotal = (int) $pdo->query('SELECT COUNT(*) FROM conversations')->fetchColumn();
$today = gmdate('Y-m-d') . 'T00:00:00+00:00';
$st = $pdo->prepare('SELECT COUNT(*) FROM messages WHERE created_at >= ?');
$st->execute([$today]);
$messagesToday = (int) $st->fetchColumn();

$recentEnquiries = $pdo->query('SELECT id, name, email, phone, company, message, type, status, source, created_at AS createdAt FROM contact_enquiries ORDER BY created_at DESC LIMIT 6')->fetchAll();
$recentChats = $pdo->query('SELECT id, session_id AS sessionId, visitor_name AS visitorName, visitor_email AS visitorEmail, company, topic, status, last_message_at AS lastMessageAt FROM conversations ORDER BY last_message_at DESC LIMIT 6')->fetchAll();

foreach ($recentChats as &$c) {
    $ms = $pdo->prepare('SELECT body FROM messages WHERE conversation_id = ? ORDER BY created_at DESC LIMIT 1');
    $ms->execute([$c['id']]);
    $last = $ms->fetch();
    $c['messages'] = $last ? [['body' => $last['body']]] : [];
}
unset($c);

json_response([
    'enquiriesNew' => $enquiriesNew,
    'enquiriesTotal' => $enquiriesTotal,
    'demosNew' => $demosNew,
    'demosTotal' => $demosTotal,
    'chatsOpen' => $chatsOpen,
    'chatsTotal' => $chatsTotal,
    'messagesToday' => $messagesToday,
    'recentEnquiries' => $recentEnquiries,
    'recentChats' => $recentChats,
]);
