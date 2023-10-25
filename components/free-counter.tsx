"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import Timer from "./timer";

interface FreeCounterProps {
    apiLimitCount: number;
}

export const FreeCounter = ({ apiLimitCount = 0 }: FreeCounterProps) => {
    const [mounted, setMounted] = useState(false);
    const [showTimer, setShowTimer] = useState(false);

    const [localApiLimitCount, setLocalApiLimitCount] = useState(apiLimitCount);

    const fetchApiLimitCount = async () => {
        try {
            const response = await fetch("/api/apiLimit");
            if (response.ok) {
                const data = await response.json();
                console.log("The current data.apiLimitCount is", data.apiLimitCount);
                console.log("The current data is", data);

                setLocalApiLimitCount(data.apiLimitCount); 
            } else {
                throw new Error("Failed to fetch apiLimitCount");
            }
        } catch (error) {
            console.log("Caught an error:", error);
            console.error("Error fetching apiLimitCount:", error);
        }
    };

    const resetApiLimitCountOnServer = async () => {
        try {
            const response = await fetch("/api/timer", { method: "PUT" });

            if (!response.ok) {
                console.error("Failed to reset API limit:", response.statusText);
            } else {
                console.log("The updated ApiLimit is", response);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchApiLimitCount();
    }, []);

    useEffect(() => {
        setMounted(true);
        console.log("the Api limit count is", apiLimitCount);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (localApiLimitCount >= MAX_FREE_COUNTS) {
            setShowTimer(true);
        }
    }, [localApiLimitCount]);

    useEffect(() => {
        setLocalApiLimitCount(apiLimitCount);
    }, [apiLimitCount]);

    const handleTimerEnd = async (updatedCount: number) => {
        await resetApiLimitCountOnServer();
        await fetchApiLimitCount();
        console.log("the The Api limit count is", apiLimitCount);
        setShowTimer(false);
    };

    if (!mounted) {
        return null;
    }

    return (
        <div className="px-3 pb-24">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>
                            {localApiLimitCount} / {MAX_FREE_COUNTS} FREE GENERATIONS
                        </p>

                        <Progress className="h-3" value={(localApiLimitCount / MAX_FREE_COUNTS) * 100} />

                    </div>
                    {showTimer && apiLimitCount >= MAX_FREE_COUNTS && <Timer initialSeconds={86400} onEnd={handleTimerEnd} />}
                </CardContent>
            </Card>
        </div>
    );
};
