import React, { useState, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Trash2, Edit, Plus, Save, Check, X, GripVertical } from 'lucide-react';
import { cn } from '../lib/utils';
import { Checkbox } from "@/app/components/ui/checkbox"

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  isEditing?: boolean;
}
interface DraggableTodoProps extends TodoItem {
  index: number;
  moveTodo: (fromIndex: number, toIndex: number) => void;
  handleToggleTodo: (id: number) => void;
  handleRemoveTodo: (id: number) => void;
  handleUpdateTodo: (id: number, newText: string) => void;
  handleEditTodo: (id: number) => void;
  handleSaveTodo: (id: number) => void;
}
const DraggableTodo: React.FC<DraggableTodoProps> = ({ id, text, completed, isEditing, index, moveTodo, ...props }) => {
  const [, drag] = useDrag({
    type: 'TODO_ITEM',
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: 'TODO_ITEM',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveTodo(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} className={cn('cursor-pointer relative w-full flex flex-row gap-2 items-center bg-white bg-opacity-40 rounded-lg p-2 hover:bg-opacity-60', completed && 'bg-green-400')}>
      <div className='text-white opacity-60'><GripVertical /></div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={text}
            onChange={(e) => props.handleUpdateTodo && props.handleUpdateTodo(id, e.target.value)}
            className='w-full'
          />
          <button onClick={() => props.handleSaveTodo && props.handleSaveTodo(id)} className='bg-blue-600 rounded-md text-white p-1 hover:bg-opacity-60'>
            <Save size={18} />
          </button>
          <button className='bg-red-600 rounded-md text-white p-1 hover:bg-opacity-60' onClick={() => props.handleRemoveTodo && props.handleRemoveTodo(id)}>
            <X size={18} />
          </button>
        </>
      ) : (
        <>
          <Checkbox
            checked={completed}
            onCheckedChange={() => props.handleToggleTodo && props.handleToggleTodo(id)}
          />
          <span className={cn('w-full px-2', completed ? 'line-through' : '')}>
            {text}
          </span>
          <button className='bg-orange-600 rounded-md text-white p-1 hover:bg-opacity-60' onClick={() => props.handleEditTodo && props.handleEditTodo(id)}>
            <Edit size={18} />
          </button>
          <button className='bg-red-600 rounded-md text-white p-1 hover:bg-opacity-60' onClick={() => props.handleRemoveTodo && props.handleRemoveTodo(id)}>
            <Trash2 size={18} />
          </button>
        </>
      )}
    </div>
  );
};

const Todo: React.FC = () => {
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
  const [domLoaded, setDomLoaded] = useState<boolean>(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
useEffect(() => {
  sessionStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);
    
const handleAddTodo = () => {
  setTodos([{ id: Date.now(), text: '', completed: false, isEditing: true },...todos]);
};

const handleToggleTodo = (id: number) => {
  setTodos((prevTodos) =>
      prevTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
  );
};

const handleRemoveTodo = (id: number) => {
  setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
};

const handleUpdateTodo = (id: number, newText: string) => {
  setTodos((prevTodos) =>
      prevTodos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
      )
  );
};

const handleEditTodo = (id: number) => {
  setTodos((prevTodos) =>
      prevTodos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: true } : todo
      )
  );
};

const handleSaveTodo = (id: number) => {
  setTodos((prevTodos) =>
      prevTodos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: false } : todo
      )
  );
};
  const moveTodo = (fromIndex: number, toIndex: number) => {
    const updatedTodos = [...todos];
    const [removed] = updatedTodos.splice(fromIndex, 1);
    updatedTodos.splice(toIndex, 0, removed);
    setTodos(updatedTodos);
  };


  return (
    <DndProvider backend={HTML5Backend}>
      {domLoaded && (
        <div className='bg-white w-full resize p-5 rounded-2xl bg-opacity-40 lg:w-[500px] shadow-lg relative lg:h-[400px] overflow-hidden'>
          <div className='w-full'>
            <p className='text-center text-2xl text-white font-bold'>Todo List</p>
            <div className='flex flex-row justify-between'>
              <button onClick={handleAddTodo} className='flex flex-row justify-center items-center gap-2 py-2 px-4 rounded-md cursor-pointer transition duration-300 bg-[#ffb88c] hover:bg-[#de6262] text-white font-bold shadow-lg'>
                <Plus size={20} /> Add Task
              </button>
              <button onClick={handleAddTodo} className='flex flex-row justify-center items-center gap-2 py-2 px-4 rounded-md cursor-pointer transition duration-300 bg-green-400 hover:bg-green-600 text-white font-bold shadow-lg'>
                <Check size={20} /> Complete all
              </button>
            </div>
            <div className='mt-5 flex flex-col w-full gap-2 h-[270px] overflow-y-auto'>
              {todos.length>0 ?todos.map((todo, index) => (
                <DraggableTodo
                  key={index}
                  index={index}
                  {...todo}
                  moveTodo={moveTodo}
                  handleToggleTodo={handleToggleTodo}
                  handleRemoveTodo={handleRemoveTodo}
                  handleUpdateTodo={handleUpdateTodo}
                  handleEditTodo={handleEditTodo}
                  handleSaveTodo={handleSaveTodo}
                />
              )): <div className='flex flex-col justify-center items-center h-1/2 text-white'><p>No tasks at the moment. Time to relax!</p></div>}
            </div>
          </div>
        </div>
      )}
    </DndProvider>
  );
};

export default Todo;

