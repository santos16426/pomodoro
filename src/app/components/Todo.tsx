import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, Save, Check, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
    isEditing?: boolean;
}

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




return (
  <>
    {domLoaded &&
    <div className='bg-white resize p-5 rounded-2xl bg-opacity-40 w-[500px] shadow-lg relative h-[400px] overflow-hidden'>
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
          {todos.map((todo, index) => (
            <div key={index} className={cn('w-full flex flex-row gap-2 bg-white bg-opacity-40 rounded-lg p-2 hover:bg-opacity-60', todo.completed && 'bg-green-400')}>
              {todo.isEditing ? (
              <>
                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) => handleUpdateTodo(todo.id, e.target.value)}
                    className='w-full'
                  />
                    <button onClick={() => handleSaveTodo(todo.id)} className='bg-blue-600 rounded-md text-white p-1 hover:bg-opacity-60'>
                    <Save size={18 } />
                  </button>
                  <button className='bg-red-600 rounded-md text-white p-1 hover:bg-opacity-60' onClick={() => handleRemoveTodo(todo.id)}>
                    <X size={18} />
                </button>
              </>
              ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                />
                <span
                  className={cn('w-full px-2', todo.completed? 'line-through': '')}
                >
                  {todo.text}
                </span>
                <button className='bg-orange-600 rounded-md text-white p-1 hover:bg-opacity-60' onClick={() => handleEditTodo(todo.id)}>
                  <Edit size={18} />
                </button>
                <button className='bg-red-600 rounded-md text-white p-1 hover:bg-opacity-60' onClick={() => handleRemoveTodo(todo.id)}>
                  <Trash2 size={18} />
                </button>
              </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    }
  </>  
);};

export default Todo;
