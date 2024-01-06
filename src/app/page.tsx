"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardContent, Card } from "@/components/ui/card"
import { useState } from "react";
import { Loader2 } from "lucide-react";

type ApiResponse = {
    profane?: boolean;
    nsfw?: boolean;
    type?: string[];
};

export default function Home() {
    const [text, setText] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [lastChecked, setLastChecked] = useState<'text' | 'image' | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const checkImageNSFW = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            if (!image) {
                throw new Error('Image cannot be empty');
            }
            const formData = new FormData();
            formData.append('file', image); // Change 'image' to 'file' to match the server
            const response = await fetch('/api/check-nsfw', {
                method: 'POST',
                body: formData,
            });
            const jsonResponse = await response.json();
            setApiResponse(jsonResponse);
        } catch (error) {
            console.error("Error checking image:", error);
        }
        setIsLoading(false);
        setLastChecked('image')
    };

    const checkProfanity = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            if (!text) {
                throw new Error('Text cannot be empty');
            }
            const response = await fetch('/api/check-profanity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });
            const jsonResponse = await response.json();
            setApiResponse(jsonResponse);
        } catch (error) {
            console.error("Error checking profanity:", error);
        }
        setIsLoading(false);
        setLastChecked('text')
    };

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold">OpenModerator Demo</h2>
                <p className="text-gray-500 dark:text-gray-400">Please enter text to check if it&apos;s profane or
                    not.</p>
            </div>
            <form onSubmit={checkProfanity} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="profanity-check">Text</Label>
                    <Textarea
                        onChange={(e) => setText(e.target.value)}
                        className="min-h-[100px]"
                        id="profanity-check"
                        name="text"
                        placeholder="Enter your text"
                    />
                </div>
                {isLoading ? <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    Please wait
                </Button> : <></>}
                {!isLoading && <Button variant={'default'} type="submit" disabled={isLoading}>
                    Check for profanity
                </Button>}
            </form>
            <form onSubmit={checkImageNSFW} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="nsfw-check">Image</Label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="block w-full text-sm"
                        id="nsfw-check"
                        name="image"
                    />
                </div>
                {isLoading ? <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    Please wait
                </Button> : <></>}
                {!isLoading && <Button variant={'default'} type="submit" disabled={isLoading}>
                    Check for NSFW content
                </Button>}
            </form>
            <Card>
                <CardContent className="p-6">
                    <h3 className="text-xl font-bold">API Response</h3>
                    {!isLoading && apiResponse && typeof apiResponse.profane !== 'undefined' && lastChecked === 'text' && (
                        apiResponse.profane
                            ? <Badge className="bg-red-500 text-white">Profane</Badge>
                            : <Badge className="bg-green-500 text-white">Not Profane</Badge>
                    )}
                    {!isLoading && apiResponse && typeof apiResponse.nsfw !== 'undefined' && lastChecked === 'image' && (
                        apiResponse.nsfw
                            ? <Badge className="bg-red-500 text-white">NSFW</Badge>
                            : <Badge className="bg-green-500 text-white">Safe</Badge>
                    )}
                    <pre className="p-4 mt-4 text-sm">
                        <code>
                            {apiResponse ? JSON.stringify(apiResponse, null, 2) : <></>}
                        </code>
                    </pre>
                </CardContent>
            </Card>
        </div>
    )
}

