import { Filter } from 'content-checker';
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
    try {
    const filter = new Filter({ openModeratorAPIKey: process.env.OPEN_MODERATOR_API_KEY } );
    const text = await req.json();
    if (!text) return new Response("No text provided", { status: 400 });
    const res = await filter.isProfaneAI(text.text);
    return new Response(JSON.stringify(res))
    } catch (error) {
        console.error("Error calling OpenModerator API", error);
        return NextResponse.json({ error: "Error calling Content Checker API" });
    }
}
