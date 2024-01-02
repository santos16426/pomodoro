import { createContext, useContext, useState } from "react";
import {Settings} from '@/app/types/settings'
import { TodoItem } from "../types/todo";
type AppContextProps = {
    settingsContext : {
        settings: Settings;
        setSettings: React.Dispatch<React.SetStateAction<Settings>>;
    }
    todoContext : {
        todos: TodoItem[];
        setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
    }
    tabContext: {
        activeTab: number;
        setActiveTab: React.Dispatch<React.SetStateAction<number>>;

    }
}

const AppContext = createContext<AppContextProps|undefined>(undefined);

type AppProviderProps = {
    children: React.ReactNode;
}

export const AppProvider:React.FC<AppProviderProps> = ({children}) => {
    const [activeTab, setActiveTab] = useState<number>(0);

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
    const [todos, setTodos] = useState<TodoItem[]>(() => {
        let value: TodoItem[] = [];
        if (typeof window !== 'undefined') {
            const saved = sessionStorage.getItem("todos");
        
            if (saved !== null) {
            value = JSON.parse(saved);
            }
        }
        return value;
    });
    const tabContextValue = {
        activeTab,
        setActiveTab
    }
    const settingsContextValue = {
        settings: settings,
        setSettings: setSettings
    }
    const todoContextValue = {
        todos,
        setTodos
    }
    return(
        <AppContext.Provider value={{settingsContext:settingsContextValue, todoContext:todoContextValue, tabContext:tabContextValue}}>
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