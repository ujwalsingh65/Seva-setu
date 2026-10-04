/**
 * NGO Dashboard — Placeholder
 * Accessible by ngo_admin and ngo_coordinator roles.
 */
import React from 'react';
import { useClerk } from '@clerk/react';
import { useAppUser } from '../../hooks/useAppUser';

export function NGODashboard() {
  const { signOut } = useClerk();
  const { user } = useAppUser();

  return (
    <div className="min-h-screen bg-brand-background">
      <header className="border-b border-brand-border bg-brand-surface px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-green flex items-center justify-center text-white font-bold text-sm">
            SS
          </div>
          <span className="font-bold text-brand-teal">SevaSetu — NGO Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-brand-text-secondary">{user?.email}</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-brand-soft-blue text-cyan-800">
            {user?.role}
          </span>
          <button
            onClick={() => signOut()}
            className="text-sm text-brand-text-secondary hover:text-brand-teal transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-brand-teal mb-2">NGO Dashboard</h1>
        <p className="text-brand-text-secondary text-sm">NGO management features coming soon.</p>
        <div className="mt-6 p-4 rounded-xl bg-brand-soft-blue border border-cyan-100 text-sm text-cyan-800">
          ✅ Authentication successful — Role: <strong>{user?.role}</strong> (sourced from Supabase DB)
        </div>
      </main>
    </div>
  );
}

export default NGODashboard;
