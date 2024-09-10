import React from 'react';

const TaskList = ({ tasks, handleDelete }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.task}
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;