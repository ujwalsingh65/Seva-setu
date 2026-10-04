-- =============================================================================
-- Migration: 001_create_users_table
-- Description: Core users table — links Clerk identities to application roles
--
-- Role enforcement rules (from Security & Access Document):
--   - Default role on creation: 'volunteer'
--   - Role changes require backend admin operation — not self-service
--   - Supabase RLS enforces read/write based on role
-- =============================================================================

-- Enable UUID extension (idempotent)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_user_id   TEXT NOT NULL UNIQUE,
  email           TEXT NOT NULL,
  role            TEXT NOT NULL DEFAULT 'volunteer'
                    CHECK (role IN ('volunteer', 'ngo_coordinator', 'ngo_admin', 'platform_admin')),
  status          TEXT NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active', 'suspended', 'disabled')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast Clerk token → app user lookups (used on every authenticated request)
CREATE INDEX IF NOT EXISTS idx_users_clerk_user_id ON users (clerk_user_id);

-- Index for email lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- Row Level Security
-- =============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own record
-- NOTE: The backend service role bypasses RLS entirely.
--       These policies apply to direct Supabase client access (future use).
CREATE POLICY "users_select_own"
  ON users
  FOR SELECT
  USING (clerk_user_id = current_setting('app.current_clerk_user_id', true));

-- Policy: Service role can do anything (used by backend API)
-- This is implicit for service_role but stated explicitly for clarity.
-- The backend always uses the service role key and bypasses RLS.

-- =============================================================================
-- Comments
-- =============================================================================

COMMENT ON TABLE users IS
  'Core user identity table. Links Clerk authentication to application roles and status.';

COMMENT ON COLUMN users.clerk_user_id IS
  'Clerk user ID (from sub claim in JWT). Used to resolve app identity from session token.';

COMMENT ON COLUMN users.role IS
  'Application role. Defaults to volunteer on signup. Changed only through admin operations.';

COMMENT ON COLUMN users.status IS
  'Account status. Suspended/disabled accounts are rejected by the auth middleware.';
