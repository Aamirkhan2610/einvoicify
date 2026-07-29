<?php
require_once __DIR__ . '/config.php';

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $dir = dirname(DB_PATH);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }

    $pdo = new PDO('sqlite:' . DB_PATH, null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $pdo->exec('PRAGMA foreign_keys = ON');
    ensure_schema($pdo);
    return $pdo;
}

function ensure_schema(PDO $pdo): void
{
    $pdo->exec(<<<'SQL'
CREATE TABLE IF NOT EXISTS contact_enquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'GENERAL',
  status TEXT DEFAULT 'NEW',
  source TEXT DEFAULT 'CONTACT_FORM',
  turnover_band TEXT,
  erp_system TEXT,
  notes TEXT,
  assigned_to TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS demo_requests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT NOT NULL,
  job_title TEXT,
  erp_system TEXT,
  monthly_invoices TEXT,
  turnover_band TEXT,
  notes TEXT,
  preferred_date TEXT,
  status TEXT DEFAULT 'NEW',
  source TEXT DEFAULT 'DEMO_REQUEST',
  ip_address TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS subscribers (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  visitor_name TEXT,
  visitor_email TEXT,
  visitor_phone TEXT,
  company TEXT,
  topic TEXT,
  status TEXT DEFAULT 'OPEN',
  source TEXT DEFAULT 'CHAT',
  assigned_to TEXT,
  last_message_at TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  sender TEXT NOT NULL,
  body TEXT NOT NULL,
  agent_name TEXT,
  read_at TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON contact_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON contact_enquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_demos_status ON demo_requests(status);
CREATE INDEX IF NOT EXISTS idx_conv_status ON conversations(status);
CREATE INDEX IF NOT EXISTS idx_conv_last ON conversations(last_message_at);
CREATE INDEX IF NOT EXISTS idx_msg_conv ON messages(conversation_id, created_at);
SQL);
}

function now_iso(): string
{
    return gmdate('c');
}
