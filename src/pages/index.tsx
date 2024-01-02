import Pomodoro from '@/app/components/Pomodoro';
import Todo from '@/app/components/Todo';
import { cn } from '@/app/lib/utils';



const App = () => {
    
 
    

   
    return (
        <div className={cn('h-screen flex flex-col lg:flex-row justify-center items-center gap-5 pt-16 lg:pt-0 px-2')}>
            <Pomodoro/>
            <Todo/>
        </div>
    );
};

export default App;
