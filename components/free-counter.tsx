"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-model";
import Timer from "./timer";
import { getApiLimitCount } from "@/lib/api-limit";


interface FreeCounterProps {
    apiLimitCount: number
}


export const FreeCounter = ({apiLimitCount = 0}: FreeCounterProps) => {
    const proModal = useProModal();
    
    const [mounted, setMounted] = useState(false);

    const [showTimer, setShowTimer] = useState(false);

    const [limitCount, setLimitCount] = useState<number>(apiLimitCount);

    useEffect(() => {
        setMounted(true)
        console.log("the Api limit count is", apiLimitCount)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (apiLimitCount >= MAX_FREE_COUNTS) {
            setShowTimer(true);
        }
    }, [apiLimitCount]);

    const handleTimerEnd = async (updatedCount: number) => {
        // This function is triggered when the timer ends
        // You can re-fetch the `apiLimitCount` from your server or simply set it to 0
        setLimitCount(updatedCount); // Assuming you want to reset it
    };
    

    if (!mounted) {
        return null;
    }

    return (
        <div className="px-3 pb-5">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2"> 
                        <p>
                            {limitCount} / {MAX_FREE_COUNTS} FREE GENERATIONS
                        </p>

                        <Progress className="h-3" value={apiLimitCount / MAX_FREE_COUNTS * 100 }  />
                    </div>
                    {showTimer && limitCount >= MAX_FREE_COUNTS && <Timer initialSeconds={5} onEnd={handleTimerEnd} />}

                </CardContent>
            </Card>
        </div>
    )
}