import { Filter } from 'content-checker';

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file') as Blob | null;

        if (!file) {
            return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
        }

        const filter = new Filter({ openModeratorAPIKey: process.env.OPEN_MODERATOR_API_KEY });
        const nsfwCheck = await filter.isImageNSFW(file);

        return new Response(JSON.stringify(nsfwCheck), { status: 200 });
    } catch (error) {
        console.error("Error calling OpenModerator API", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
