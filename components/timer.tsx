import { useState, useEffect } from 'react';

interface TimerProps {
    initialSeconds: number;
    onEnd: (updatedCount: number) => void;
}

const Timer = ({ initialSeconds, onEnd }: TimerProps) => {
    const [seconds, setSeconds] = useState(initialSeconds);

    // Helper function to convert seconds to hours, minutes, and seconds
    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return { hrs, mins, secs };
    };

    const handleTimerEnd = async () => {
        try {
            const response = await fetch('/api/timer', { method: 'PUT' });
            
            if (!response.ok) {
                console.error('Failed to reset API limit:', response.statusText);
            } else {
                const updatedApiLimit = await fetch('/api/apiLimit');
                const { apiLimitCount: updatedCount } = await updatedApiLimit.json();
    
                // Assuming updatedCount is now 0, invoke the callback
                onEnd(updatedCount);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    
    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds((prevSeconds) => prevSeconds - 1);
            } else {
                clearInterval(interval);
                handleTimerEnd();
            }
        }, 1000);
    
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seconds]);

    const { hrs, mins, secs } = formatTime(seconds);

    return (
        <div>
            <p className="text-white text-center">{hrs}hr {mins}min {secs}sec</p>
            <p className="text-white/30 text-center">for 5 more generations</p>
        </div>
    );
};

export default Timer;
