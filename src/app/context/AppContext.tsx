import { createContext, useContext, useState } from "react";
import {Settings} from '@/app/types/settings'
type AppContextProps = {
    settingsContext : {
        settings: Settings;
        setSettings: React.Dispatch<React.SetStateAction<Settings>>;
    }
}

const AppContext = createContext<AppContextProps|undefined>(undefined);

type AppProviderProps = {
    children: React.ReactNode;
}

export const AppProvider:React.FC<AppProviderProps> = ({children}) => {
    const [settings, setSettings] = useState<Settings>(()=>{
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
    });

    const settingsContextValue = {
        settings: settings,
        setSettings: setSettings
    }
    return(
        <AppContext.Provider value={{settingsContext:settingsContextValue}}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = () => {
    const context = useContext(AppContext);
    if(!context){
        throw new Error('useAppContext must be within an AppProvider')
    }
    return context
}