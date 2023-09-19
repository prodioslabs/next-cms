import { z } from 'zod'

export const objectId = z.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)

type Literal = z.infer<typeof literalSchema>
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])

type Json = Literal | { [key: string]: Json } | Json[]
export const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
)
