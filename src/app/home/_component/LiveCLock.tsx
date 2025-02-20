import { memo, useEffect, useState } from "react";
import { WorkTime } from "@/styles/home";

const LiveClock = memo(() => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <WorkTime>{time.toLocaleTimeString()}</WorkTime>;
});

LiveClock.displayName = "LiveClock";

export default LiveClock;
