import { cn } from '@/app/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Square, TimerReset } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
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
    const [timerValue, setTimerValue] = useState<number>(25 * 60);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const { settingsContext, todoContext, tabContext } = useAppContext();
    const {activeTab, setActiveTab} = tabContext
    const audioRef = useRef<HTMLAudioElement |null>(null);
    const volume = settingsContext.settings.sounds.volume/100;
    const tabs: string[] = [
        "Pomodoro",
        "Short Break",
        "Long Break"
    ];
    useEffect(() => {
        const savedSettings = sessionStorage.getItem("settings");
        if (savedSettings) {
            const parsedSettings = JSON.parse(savedSettings);
            const { timer: timerSettings } = parsedSettings;
            let time = 25;
            if(activeTab === 0){
                time = timerSettings.pomodoro
            }
            if(activeTab === 1){
                time = timerSettings.short
            }
            if(activeTab === 2){
                time = timerSettings.long
            }
            setTimerValue(time * 60);
            setIsRunning(false)
        }
    }, [activeTab,settingsContext]);

    useEffect(() => {
        let timerInterval: NodeJS.Timeout;
        if (isRunning && timerValue > 0) {
            timerInterval = setInterval(() => {
                setTimerValue(prevValue => prevValue - 1);
            }, 1000);
            
        }
        if(timerValue === 0){
            if(audioRef.current){
                audioRef.current.src = settingsContext.settings.sounds.alarm;
                audioRef.current.play();
                (audioRef.current as any).volume = volume;
            }
            if(settingsContext.settings.tasks.autoComplete && activeTab === 0){
                const currentTodos = todoContext.todos
                todoContext.setTodos(currentTodos.map((todo)=>{
                    return {...todo, completed:true}
                }))
                sessionStorage.setItem('todos', JSON.stringify(todoContext))
            }
            setIsRunning(false);
        }

        return () => clearInterval(timerInterval);
    }, [activeTab, isRunning, settingsContext.settings.sounds.alarm, settingsContext.settings.tasks.autoComplete, timerValue, todoContext, volume]);
    useEffect(()=>{
        audioRef.current = new Audio();
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
            }
            audioRef.current = null;
        }
    },[])
    const handleStartPause = () => {
        setIsRunning(prevValue => !prevValue);
    };

    const handleReset = () => {
        const time:number = settingsContext.settings.timer[activeTab === 0 ? 'pomodoro': activeTab === 2 ? 'short' : 'long'];
        console.log(time)
        if(audioRef.current){
            audioRef.current.pause();
        }
        setTimerValue(time * 60);
        setIsRunning(false);
    };

    

    return(
        <div className='bg-white p-2 lg:p-5 rounded-2xl bg-opacity-40 w-full lg:w-[500px] shadow-lg lg:min-h-[400px]'>
            <div className='flex flex-row gap-4 px-2 justify-around py-2'>
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
            <div className='text-[8rem] lg:text-[10rem] text-center font-bold text-white'>{Math.floor(timerValue / 60)}:{timerValue % 60 < 10 ? '0' : ''}{timerValue % 60}</div>
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