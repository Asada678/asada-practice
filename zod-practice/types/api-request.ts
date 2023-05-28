import { z } from "zod"
import { NextApiRequest } from 'next';

export const apiRequestValidator = z.object({
    name:z.string()
  })
  
 export type ApiRequest = z.infer<typeof apiRequestValidator>

 export const apiRequestResponse =z.object({
    error: z.string().optional(),
    data:z.string()
 })