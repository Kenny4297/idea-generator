import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAIApi from 'openai';

const openai = new OpenAIApi({ apiKey: process.env.OPENAI_API_KEY });

import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';


export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401})
        }

        if (!process.env.OPENAI_API_KEY) {
            return new NextResponse("OpenAI Key not configured", { status: 500 })
        }       
        
        if (!messages) {
            return new NextResponse("Messages are required", { status: 400})
        }

        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse("Free trial has expired", { status: 403})
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages});

            await increaseApiLimit();

            return NextResponse.json(response.choices[0].message);

    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("internale error", { status: 500 })
    }
}
