import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async () => {
    if (!newTask) return;
    try {
      await axios.post('http://localhost:5000/api/tasks', { name: newTask });
      setNewTask('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = async () => {
    if (!editedTaskName || !editingTaskId) return;
    try {
      await axios.put(`http://localhost:5000/api/tasks/${editingTaskId}`, { name: editedTaskName });
      setEditingTaskId(null);
      setEditedTaskName('');
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      
      {/* Add Task Form */}
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      
      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {editingTaskId === task._id ? (
              <div>
                <input
                  type="text"
                  value={editedTaskName}
                  onChange={(e) => setEditedTaskName(e.target.value)}
                />
                <button onClick={handleEditTask}>Save</button>
                <button onClick={() => setEditingTaskId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                {task.name}
                <button onClick={() => {
                  setEditingTaskId(task._id);
                  setEditedTaskName(task.name);
                }}>Edit</button>
                <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
