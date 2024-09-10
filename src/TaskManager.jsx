import React, { useEffect, useRef, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask } from './store';

// Lazy load TaskList
const TaskList = React.lazy(() => import('./TaskList'));

const TaskManager = () => {
  const [inputValue, setInputValue] = useState('');
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const uncontrolledInputRef = useRef(null);

  // Simulating fetching tasks when component mounts
  useEffect(() => {
    console.log('Component mounted, simulating task fetch...');
    return () => {
      console.log('Component unmounted, performing cleanup...');
    };
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    dispatch(addTask(inputValue));
    setInputValue('');
  };

  // Handle task deletion
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div>
      <h1>Task Manager</h1>

      {/* Controlled Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a task"
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Uncontrolled Input */}
      <div>
        <input
          type="text"
          ref={uncontrolledInputRef}
          placeholder="Uncontrolled input"
        />
        <button onClick={() => console.log(uncontrolledInputRef.current.value)}>
          Log Uncontrolled Input
        </button>
      </div>

      {/* Task List */}
      <Suspense fallback={<div>Loading tasks...</div>}>
        <TaskList tasks={tasks} handleDelete={handleDelete} />
      </Suspense>
    </div>
  );
};

export default TaskManager;