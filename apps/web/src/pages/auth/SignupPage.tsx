/**
 * Signup Page
 *
 * Uses Clerk's <SignUp> hosted component.
 * On completion, Clerk fires a `user.created` webhook that the backend
 * handles to create the user record in Supabase with role='volunteer'.
 */
import React from 'react';
import { SignUp } from '@clerk/react';
import { ROUTES } from '../../routes';

export function SignupPage() {
  return (
    <div className="min-h-screen bg-brand-background flex flex-col items-center justify-center px-4">
      {/* Brand header */}
      <div className="mb-8 text-center">
        <div className="w-14 h-14 rounded-xl bg-brand-green mx-auto flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-4">
          SS
        </div>
        <h1 className="text-2xl font-bold text-brand-teal">Join SevaSetu</h1>
        <p className="text-sm text-brand-text-secondary mt-1">
          Create your account and start volunteering
        </p>
      </div>

      <SignUp
        routing="path"
        path={ROUTES.PUBLIC.SIGNUP}
        signInUrl={ROUTES.PUBLIC.LOGIN}
        fallbackRedirectUrl={ROUTES.PUBLIC.HOME}
        appearance={{
          elements: {
            rootBox: 'w-full max-w-sm',
            card: 'shadow-md rounded-xl border border-brand-border bg-brand-surface',
            headerTitle: 'hidden',
            headerSubtitle: 'hidden',
            socialButtonsBlockButton:
              'border border-brand-border rounded-medium font-medium hover:bg-brand-light-green transition-colors',
            formButtonPrimary:
              'bg-brand-green hover:bg-brand-green-dark text-white font-semibold rounded-medium transition-colors',
            footerActionLink: 'text-brand-green hover:text-brand-green-dark font-medium',
          },
        }}
      />

      <p className="mt-6 text-xs text-brand-text-muted text-center">
        Already have an account?{' '}
        <a href={ROUTES.PUBLIC.LOGIN} className="text-brand-green hover:underline font-medium">
          Sign in
        </a>
      </p>
    </div>
  );
}

export default SignupPage;
