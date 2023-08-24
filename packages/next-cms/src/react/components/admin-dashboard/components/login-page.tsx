'use client'

import { LucideIcon } from '../../../../ui'
import LoginForm from './login-form'

export default function LoginPage() {
  /**
   * Redirect the user to the dashboard if the user is already logged in
   */
  return (
    <>
      <title>CMS Login</title>
      <div className="bg-muted-background flex h-screen items-center justify-center">
        <div className="w-[480px] rounded-md border bg-primary-foreground p-6">
          <div className="mb-4 flex items-center space-x-4">
            <LucideIcon name="atom" className="h-10 w-10 text-foreground" />
            <div className="flex-1">
              <div className="text-xl font-semibold text-foreground">Admin Login</div>
              <div className="text-sm text-muted-foreground">
                Login with the credentials present in <code>.env</code>
              </div>
            </div>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  )
}
