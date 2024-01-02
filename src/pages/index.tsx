import Pomodoro from '@/app/components/Pomodoro';
import Todo from '@/app/components/Todo';
import { cn } from '@/app/lib/utils';



const App = () => {
    
 
    

   
    return (
        <div className={cn('h-screen flex flex-row justify-center items-center gap-5')}>
            <Pomodoro/>
            <Todo/>
        </div>
    );
};

export default App;
