import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/ToDoList";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks`);
        console.log("Fetched tasks:", response.data); 
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);


  const addTask = async () => {
    if (!task) return;

    try {
      console.log("Adding task:", task);
      const response = await axios.post(
        `http://localhost:5000/api/tasks`,
        { title: task },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Task added response:", response.data);
      setTasks([...tasks, response.data]);
      setTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };


  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };


  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        updatedTask,
        { headers: { "Content-Type": "application/json" } }
      );

      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, ...response.data } : task
        )
      );
      setEditingTaskId(null);
      setEditingTitle("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };


  const startEditing = (id) => {
    setEditingTaskId(id);
  };

  const handleEditChange = (e) => {
    setEditingTitle(e.target.value);
  };


  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <br/>
      <TodoList
        tasks={tasks}
        deleteTask={deleteTask}
        updateTask={updateTask}
        editingTitle={editingTitle}
        setEditingTitle={setEditingTitle}
        editingTaskId={editingTaskId}
        setEditingTaskId={setEditingTaskId}
        startEditing={startEditing}
        handleEditChange={handleEditChange}
      />
    </div>
  );
};


export default App;
