import { Atom } from 'lucide-react'
import LoginForm from './login-form'

export default async function LoginPage() {
  /**
   * Redirect the user to the dashboard if the user is already logged in
   */
  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <div className="w-[480px] rounded-md bg-primary-foreground p-6">
        <div className="mb-4 flex items-center space-x-4">
          <Atom className="h-10 w-10" />
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
  )
}
