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

const Header = () =>{
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
                                <Input/>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 pb-2">Short Break</p>
                                <Input/>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 pb-2">Long Break</p>
                                <Input/>
                            </div>
                        </div>
                        <Separator/>
                        <div>
                            <div className="font-bold pb-3 flex flex-row gap-2 text-md items-center">Sounds <AudioLines size={18} className="text-gray-500"/></div>
                            <div className="flex flex-row gap-5">
                                <div>
                                    <p className="text-sm text-gray-500 pb-2">Alarm Sounds</p>
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select alarm" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="lorem">Birds</SelectItem>
                                            <SelectItem value="ipsum">Wood</SelectItem>
                                            <SelectItem value="dolor">Nature</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="w-1/2">
                                    <p className="text-sm text-gray-500 pb-2">Volume</p>
                                    <div className="flex flex-row justify-center gap-2 text-gray-500">
                                        <Volume />
                                        <Slider className="w-full" defaultValue={[33]} max={100} step={1} />
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
                                    <Checkbox/><p className="text-sm">Auto complete tasks</p>
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <Checkbox/><p className="text-sm">Remove when complete</p>
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
                                    onClick={()=>alert('test')}
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