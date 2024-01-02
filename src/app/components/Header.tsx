import { AudioLines, Cog, ListChecks, Timer, Volume, Volume2 } from "lucide-react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/app/components/ui/dialog"
import { Separator } from "./ui/separator"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Slider } from "./ui/slider"
import { Checkbox } from "@/app/components/ui/checkbox"
import { useEffect, useState } from "react"
import {Settings} from '@/app/types/settings'
import { useAppContext } from "../context/AppContext"


const Header:React.FC = () =>{
    const [domLoaded, setDomLoaded] = useState<boolean>(false);
    const { settingsContext } = useAppContext();
    const [settings,setSettings] = useState<Settings>(()=>{
        let value:Settings = {
            timer:{
                pomodoro: 25,
                short: 5,
                long: 10,
            },
            sounds:{
                alarm: '/alarm/birds.mp3',
                volume: 50,
            },
            tasks:{
                autoComplete:false,
                removeCompleted:false,
            },
        };
        if(typeof window !== 'undefined'){
            const saved = sessionStorage.getItem("settings");
            if(saved !== null){
                value = JSON.parse(saved);
            }
        }
        return value;
    })
    const handleChange = (parent:string,key:string,value:number|string|boolean):void =>{
        setSettings((prevSettings) =>{
            const updatedSettings = {...prevSettings}
            if(parent === 'timer'){
                updatedSettings.timer = {
                    ...updatedSettings.timer,
                    [key]: typeof value === 'string' ? parseInt(value) : value
                }
            }
            if(parent === 'sounds'){
                updatedSettings.sounds = {
                    ...updatedSettings.sounds,
                    [key]: value
                }
            }
            if(parent === 'tasks'){
                updatedSettings.tasks = {
                    ...updatedSettings.tasks,
                    [key]: value
                }
            }
            return updatedSettings
        })
    }
    const handleSave = ()=>{
        sessionStorage.setItem('settings', JSON.stringify(settings))
        settingsContext.setSettings(settings)
    }
    useEffect(() => {
        setDomLoaded(true);
    }, []);
    if(!domLoaded) return <></>
    return(
        <div className='fixed flex flex-col w-full h-20 p-4 lg:p-10'>
            <div className='flex flex-row justify-between lg:justify-around w-full'>
                <p className='text-3xl font-semibold text-white flex flex-row justify-center items-center gap-2 cursor-pointer'><Timer /> Pomodoro </p>
                <Dialog>
                    <DialogTrigger><p className='text-md font-semibold text-white flex flex-row justify-center items-center gap-2 cursor-pointer'>Settings<Cog className="w-8 h-8 lg:w-full lg:h-full"/></p></DialogTrigger>
                    <DialogContent className="w-full">
                        <p className="font-bold text-xl">Settings</p>
                        <p className="font-bold text-xs text-gray-400">Update your settings</p>
                        <Separator/>
                        <div className="font-bold flex flex-row gap-2 text-md items-center">Timer<Timer size={18} className="text-gray-500"/></div>
                        <div className="flex flex-row gap-5 w-full">
                            <div>
                                <p className="text-sm text-gray-500 pb-2">Pomodoro</p>
                                <Input 
                                    type='number' 
                                    value={settings.timer.pomodoro} 
                                    onChange={(e)=>handleChange('timer', 'pomodoro', e.target.value)}
                                />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 pb-2">Short Break</p>
                                <Input 
                                    type='number' 
                                    value={settings.timer.short} 
                                    onChange={(e)=>handleChange('timer', 'short', e.target.value)}
                                />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 pb-2">Long Break</p>
                                <Input 
                                    type='number' 
                                    value={settings.timer.long} 
                                    onChange={(e)=>handleChange('timer', 'long', e.target.value)}
                                />
                            </div>
                        </div>
                        <Separator/>
                        <div>
                            <div className="font-bold pb-3 flex flex-row gap-2 text-md items-center">Sounds <AudioLines size={18} className="text-gray-500"/></div>
                            <div className="flex flex-row gap-5">
                                <div>
                                    <p className="text-sm text-gray-500 pb-2">Alarm Sounds</p>
                                    <Select 
                                        value={settings.sounds.alarm} 
                                        onValueChange={e=>handleChange('sounds', 'alarm', e)}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select alarm" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="/alarm/birds.mp3">Birds</SelectItem>
                                            <SelectItem value="/alarm/forest.mp3">Forest</SelectItem>
                                            <SelectItem value="/alarm/morning.mp3">Morning</SelectItem>
                                            <SelectItem value="/alarm/upbeat.mp3">Up beat</SelectItem>
                                            <SelectItem value="/alarm/waltz.mp3">Waltz</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="w-1/2">
                                    <p className="text-sm text-gray-500 pb-2">Volume</p>
                                    <div className="flex flex-row justify-center gap-2 text-gray-500">
                                        <Volume />
                                        <Slider className="w-full" value={[settings.sounds.volume]} max={100} onValueChange={e=>handleChange('sounds','volume',e[0])}/>
                                        <Volume2 />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Separator/>
                        <div>
                            <div className="font-bold pb-3 flex flex-row gap-2 text-md items-center">Task <ListChecks size={18} className="text-gray-500"/></div>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <Checkbox
                                        checked={settings.tasks.autoComplete}
                                        onCheckedChange={e=>handleChange('tasks', 'autoComplete',e)}
                                    /><p className="text-sm">Auto complete tasks</p>
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <Checkbox
                                        onCheckedChange={e=>handleChange('tasks', 'removeCompleted',e)}
                                    /><p className="text-sm">Remove when complete</p>
                                </div>
                            </div>
                        </div>
                        <Separator/>
                        <div className="flex justify-between flex-row">
                            <DialogClose asChild>
                                <button type="button" className="border-2 py-2 px-4 rounded-md transition duration-300  flex flex-col justify-center  items-center">
                                    Close
                                </button>
                            </DialogClose>
                            <DialogClose>
                                <button 
                                    type="button" 
                                    onClick={handleSave}
                                    className="bg-green-600 hover:bg-opacity-70 text-white py-2 px-4 rounded-md transition duration-300  flex flex-col justify-center  items-center"
                                >
                                    Save
                                </button>
                            </DialogClose>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
export default Header