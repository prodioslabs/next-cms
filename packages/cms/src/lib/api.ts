import { z } from 'zod'

export function handleError(error: any) {
  if (error instanceof z.ZodError) {
    return new Response(JSON.stringify({ message: error.message, issues: error.issues }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    })
  } else if (error instanceof Error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  return Response.error()
}
