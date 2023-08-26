'use client'

import { forwardRef, useState } from 'react'
import { cn } from '../lib/utils'
import { LucideIcon } from '../../ui'

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({ className, style, ...props }, ref) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <div
      className={cn(
        'flex h-10 w-full overflow-hidden rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      style={style}
    >
      <input
        type={passwordVisible ? 'text' : 'password'}
        ref={ref}
        {...props}
        className="flex-1 px-3 py-2 outline-none"
      />
      <button
        type="button"
        className="flex-shrink-0 p-1 text-muted-foreground focus:outline-none"
        onClick={() => {
          setPasswordVisible((prevState) => !prevState)
        }}
      >
        {passwordVisible ? (
          <LucideIcon name="eye-off" className="h-4 w-4" />
        ) : (
          <LucideIcon name="eye" className="h-4 w-4" />
        )}
      </button>
    </div>
  )
})
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
