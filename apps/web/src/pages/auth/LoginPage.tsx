/**
 * Login Page
 *
 * Uses Clerk's <SignIn> hosted component for a complete, secure login UI.
 * After sign-in, Clerk redirects back to the app and the useAppUser hook
 * fetches the user's authoritative role from our backend.
 */
import React from 'react';
import { SignIn } from '@clerk/react';
import { ROUTES } from '../../routes';

export function LoginPage() {
  return (
    <div className="min-h-screen bg-brand-background flex flex-col items-center justify-center px-4">
      {/* Brand header */}
      <div className="mb-8 text-center">
        <div className="w-14 h-14 rounded-xl bg-brand-green mx-auto flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-4">
          SS
        </div>
        <h1 className="text-2xl font-bold text-brand-teal">Welcome back</h1>
        <p className="text-sm text-brand-text-secondary mt-1">
          Sign in to your SevaSetu account
        </p>
      </div>

      <SignIn
        routing="path"
        path={ROUTES.PUBLIC.LOGIN}
        signUpUrl={ROUTES.PUBLIC.SIGNUP}
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
        Don&apos;t have an account?{' '}
        <a href={ROUTES.PUBLIC.SIGNUP} className="text-brand-green hover:underline font-medium">
          Sign up
        </a>
      </p>
    </div>
  );
}

export default LoginPage;
