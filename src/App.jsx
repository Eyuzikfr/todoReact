import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const bodyEl = document.querySelector("body");

  // toggle between light and dark themes
  const toggleTheme = () => {
    setDarkMode((prevState) => !prevState);

    if (!darkMode) {
      bodyEl.classList.add("dark-theme");
    } else {
      bodyEl.classList.remove("dark-theme");
    }
  };

  // add task
  const addTask = (e) => {
    e.preventDefault();

    if (!newTask.trim()) return;

    const newTaskObj = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTaskObj]);

    setNewTask("");
  };

  // mark task as completed
  const markAsCompleted = (task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? { ...t, completed: true } : t))
    );
  };

  // delete task
  const deleteTask = (task) => {
    if (confirm(`Delete "${task.title}"?`)) {
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    }
  };

  const taskList = tasks.map((task) => {
    return (
      <li key={task.id}>
        {task.title} - {task.completed ? "Completed" : "Not Completed"}
        <button onClick={() => markAsCompleted(task)}> ✅</button>
        <button onClick={() => deleteTask(task)}>-</button>
      </li>
    );
  });

  return (
    <>
      <h1>Tasks</h1>
      <button onClick={toggleTheme}>{darkMode ? "Light" : "Dark"} Mode</button>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">+ Add</button>
      </form>
      <ul>{taskList}</ul>
    </>
  );
}
