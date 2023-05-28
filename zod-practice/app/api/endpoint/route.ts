import { apiRequestValidator } from "@/types/api-request";

export async function POST (req: Request) {
    const body = await req.json()

    try {
        const data = apiRequestValidator.parse(body)
        
    } catch (error) {
        return new Response('entity not matched', {status: 412})
    }
    return new Response('OK', {status: 200})
}