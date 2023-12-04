import { Filter } from 'content-checker';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
    const filter = new Filter({ contentCheckerAPIKey: process.env.CONTENT_CHECKER_API_KEY } );
    const text = await req.json();
    if (!text) return new Response("No text provided", { status: 400 });
    const res = await filter.isProfaneAI(text.text);
    return new Response(JSON.stringify(res))
    } catch (error) {
        console.error("Error calling Content Checker API", error);
        return NextResponse.json({ error: "Error calling Content Checker API" });
    }
}
