import { cn } from '@/app/lib/utils';
import { useEffect, useState } from 'react';
import { Play, Pause, Square, TimerReset } from 'lucide-react';

type TimerType = {
    id: number,
    type: string,
    value: number
};

const timer: TimerType[] = [
    {
        id: 0,
        type: "Pomodoro",
        value: 25
    },
    {
        id: 1,
        type: "Short Break",
        value: 5
    },
    {
        id: 2,
        type: "Long Break",
        value: 10
    },
];

const Pomodoro = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [timerValue, setTimerValue] = useState<number>(25 * 60); // Initial value in seconds
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const tabs: string[] = [
        "Pomodoro",
        "Short Break",
        "Long Break"
    ];
    useEffect(() => {
        setTimerValue(timer[activeTab].value * 60); 
    }, [activeTab]);

    useEffect(() => {
        let timerInterval: NodeJS.Timeout;

        if (isRunning && timerValue > 0) {
            timerInterval = setInterval(() => {
                setTimerValue(prevValue => prevValue - 1);
            }, 1000);
            
        }
        if(timerValue === 0){
            alert("finish timer")
        }

        return () => clearInterval(timerInterval);
    }, [isRunning, timerValue]);

    const handleStartPause = () => {
        setIsRunning(prevValue => !prevValue);
    };

    const handleReset = () => {
        setTimerValue(timer[activeTab].value * 60);
        setIsRunning(false);
    };

    

    return(
        <div className='bg-white p-5 rounded-2xl bg-opacity-40 w-[500px] shadow-lg min-h-[400px]'>
            <div className='flex flex-row gap-4 px-2 justify-around'>
            {tabs.map((tab, index) => (
                <div
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={cn(
                        'py-2 px-4 rounded-md cursor-pointer transition duration-300',
                        activeTab === index
                            ? 'bg-[#ffb88c] text-white font-bold shadow-lg'
                            : 'bg-[#de6262] text-white hover:bg-[#ffb88c]'
                    )}
                >
                    {tab}
                </div>
            ))}
            </div>
            <div className='text-[10rem] text-center font-bold text-white'>{Math.floor(timerValue / 60)}:{timerValue % 60 < 10 ? '0' : ''}{timerValue % 60}</div>
            <div className="flex gap-4 flex-row justify-center mt-4">
                <button
                    className={cn('text-white py-2 px-4 rounded-md transition duration-300  flex flex-col justify-center  items-center',
                        isRunning ? 'hover:bg-orange-600 bg-orange-400' : 'hover:bg-green-600 bg-green-400',
                    )}
                    onClick={handleStartPause}
                >
                    {isRunning ? <Pause size={20} /> : <Play size={20} />}
                    {isRunning? 'Pause' : 'Play'}
                </button>
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 flex flex-col justify-center  items-center"
                    onClick={handleReset}
                >
                    <TimerReset size={20}/> Reset
                </button>
            </div>
        </div>
    )
}
export default Pomodoro