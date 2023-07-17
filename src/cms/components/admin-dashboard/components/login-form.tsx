'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { PasswordInput } from '~/components/ui/password-input'
import { cn } from '~/lib/utils'

type LoginFormProps = {
  className?: string
  style?: React.CSSProperties
}

const validationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export default function LoginForm({ className, style }: LoginFormProps) {
  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  })

  return (
    <Form {...form}>
      <form
        className={cn('space-y-4', className)}
        style={style}
        onSubmit={form.handleSubmit(({ email, password }) => {
          console.log({ email, password })
        })}
        onReset={() => {
          form.reset()
        }}
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Password" {...field} />
                </FormControl>
              </FormItem>
            )
          }}
        />
        <Button className="w-full">Login</Button>
      </form>
    </Form>
  )
}
