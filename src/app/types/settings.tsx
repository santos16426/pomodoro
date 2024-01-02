export  type Settings = {
    timer:{
        pomodoro: number,
        short: number,
        long:number
    }
    sounds:{
        alarm: string,
        volume: number,
    }
    tasks:{
        autoComplete:boolean,
        removeCompleted:boolean,
    },

}