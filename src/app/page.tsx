"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardContent, Card } from "@/components/ui/card"
import { useState } from "react";
import {Loader2} from "lucide-react";

type ApiResponse = {
    profane: boolean;
    type?: string[];
};

export default function Home() {
    const [text, setText] = useState('');
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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
    };

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold">OpenModerator Demo</h2>
                <p className="text-gray-500 dark:text-gray-400">Please enter text to check if it&apos;s profane or not.</p>
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
                { isLoading ?   <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button> : <></>}
                { !isLoading && <Button variant={'default'} type="submit" disabled={isLoading}>
                    Check for profanity
                </Button>}
            </form>
            <Card>
                <CardContent className="p-6">
                    <h3 className="text-xl font-bold">API Response</h3>
                    { !isLoading && apiResponse && apiResponse.profane ? <Badge className="bg-red-500 text-white">Profane</Badge> : <></>}
                    { !isLoading && apiResponse && !apiResponse.profane ? <Badge className="bg-blue-500 text-white">Not Profane</Badge> : <></>}
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

