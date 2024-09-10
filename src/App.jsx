
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const TaskForm = () => {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim()) {
            dispatch({
                type: 'ADD_TASK',
                payload: { id: Date.now(), name: task, description: description }
            });
            setTask('');
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter a task"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
            />
            <button type="submit">Add Task</button>
        </form>
    );
};


const TaskList = () => {
    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();

    const handleViewDetails = (task) => {
        dispatch({ type: 'SET_SELECTED_TASK', payload: task });
    };

    const handleDeleteTask = (taskId) => {
        dispatch({ type: 'DELETE_TASK', payload: taskId }); // Dispatch delete action
    };

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    {task.name}
                    <button onClick={() => handleViewDetails(task)}>View Details</button>
                    <button onClick={() => handleDeleteTask(task.id)}>Delete</button> {/* Delete Task */}
                </li>
            ))}
        </ul>
    );
};


const TaskDetails = () => {
    const selectedTask = useSelector((state) => state.selectedTask);

    if (!selectedTask) return <p>Select a task to view details</p>;

    return (
        <div>
            <h2>Task Details</h2>
            <p><strong>Name:</strong> {selectedTask.name}</p>
            <p><strong>Description:</strong> {selectedTask.description}</p>
        </div>
    );
};


const TaskManagerApp = () => {
    return (
        <div>
            <h1>Task Manager</h1>
            <TaskForm />
            <TaskList />
            <TaskDetails />
        </div>
    );
};

export default TaskManagerApp;
