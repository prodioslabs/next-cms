import { NextResponse } from 'next/server'
import { z } from 'zod'

export function handleError(error: any) {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ message: error.message, issues: error.issues }, { status: 422 })
  } else if (error instanceof Error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
  return NextResponse.error()
}
