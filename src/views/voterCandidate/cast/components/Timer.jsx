import React from 'react';
import { useTime } from 'react-timer-hook';

function MyTime() {
    const { seconds, minutes, hours, ampm } = useTime({ format: '12-hour' });

    return (
        <div style={{ textAlign: 'center' }}>
            <div className="text-6xl text-themePurple">
                <span>{hours.toString().padStart(2, '0')}</span>:<span>{minutes.toString().padStart(2, '0')}</span>:
                <span>{seconds.toString().padStart(2, '0')}</span>
                <span>{ampm}</span>
            </div>
        </div>
    );
}

export default MyTime;
