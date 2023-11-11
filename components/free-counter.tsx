"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";

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

                setLocalApiLimitCount(data.apiLimitCount);
            } else {
                throw new Error("Failed to fetch apiLimitCount");
            }
        } catch (error) {
            console.log("Caught an error:", error);
            console.error("Error fetching apiLimitCount:", error);
        }
    };

    useEffect(() => {
        fetchApiLimitCount();
    }, []);

    useEffect(() => {
        setMounted(true);
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
                    {showTimer && apiLimitCount >= MAX_FREE_COUNTS && (
                        <p className="text-white text-center">
                            Email me at <span className="text-emerald-300">geckob4i@gmail.com</span> for more generations
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
