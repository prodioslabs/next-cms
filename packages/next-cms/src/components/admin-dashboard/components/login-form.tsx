'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Button, Input, PasswordInput, cn, useToast, Form, FormControl, FormFieldWithController, FormItem, FormLabel, FormMessage } from 'ui'

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
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { toast } = useToast()

  const router = useRouter()

  const mutation = useMutation(
    (values: { email: string; password: string }) =>
      signIn('credentials', { ...values, redirect: false, callbackUrl: '/cms/admin' }),
    {
      onSuccess: (result) => {
        if (result?.url) {
          const url = new URL(result.url)
          router.replace(url.pathname)
        } else if (result?.error) {
          toast({
            title: 'Error logging in',
            description: result.error === 'CredentialsSignin' ? 'Invalid credentials' : 'Unknown error',
            variant: 'destructive',
          })
        }
      },
    },
  )

  return (
    <Form {...form}>
      <form
        className={cn('space-y-4', className)}
        style={style}
        onSubmit={form.handleSubmit(({ email, password }) => {
          mutation.mutate({ email, password })
        })}
        onReset={() => {
          form.reset()
        }}
      >
        <FormFieldWithController
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
        <FormFieldWithController
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
        <Button className="w-full" loading={mutation.isLoading}>
          Login
        </Button>
      </form>
    </Form>
  )
}
