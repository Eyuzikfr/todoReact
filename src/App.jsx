import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("all");

  const bodyEl = document.querySelector("body");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
  const toggleCompletion = (task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // delete task
  const deleteTask = (task) => {
    if (confirm(`Delete "${task.title}"?`)) {
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    }
  };

  // update task list according to the filter
  const taskList = filteredTasks.map((task) => {
    return (
      <li
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed ? "gray" : "",
        }}
        key={task.id}
      >
        <div className="checkbox-title">
          <input
            className="checkbox-input"
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleCompletion(task)}
          />
          {task.title}
        </div>
        <button className="delete-btn" onClick={() => deleteTask(task)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </li>
    );
  });

  return (
    <main
      style={{
        backgroundColor: darkMode ? "rgb(73, 73, 73)" : "rgb(208, 208, 208)",
      }}
    >
      <h1>Too Much To-Do List</h1>
      <button onClick={toggleTheme} className="toggle-theme-btn">
        {darkMode ? (
          <i class="fa-solid fa-sun"></i>
        ) : (
          <i class="fa-solid fa-moon"></i>
        )}
      </button>
      <form onSubmit={addTask}>
        <input
          className="task-input"
          type="text"
          placeholder="Add task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ backgroundColor: darkMode ? "rgb(230, 230, 230)" : "" }}
        />
        <button type="submit" className="add-btn">
          <i className="fa-solid fa-plus"></i>
        </button>
      </form>
      <div className="category-selection">
        <button
          className="category-btn"
          onClick={() => setFilter("all")}
          style={{
            backgroundColor: filter === "all" ? "rgb(0, 228, 164)" : "",
            color: filter === "all" ? "black" : "",
            boxShadow: darkMode
              ? "0px 0px 10px 0px rgba(255, 255, 255, 0.2)"
              : "",
          }}
        >
          All Tasks
        </button>
        <button
          className="category-btn"
          onClick={() => setFilter("completed")}
          style={{
            backgroundColor: filter === "completed" ? "rgb(0, 228, 164)" : "",
            color: filter === "completed" ? "black" : "",
            boxShadow: darkMode
              ? "0px 0px 10px 0px rgba(255, 255, 255, 0.2)"
              : "",
          }}
        >
          Completed
        </button>
        <button
          className="category-btn"
          onClick={() => setFilter("incomplete")}
          style={{
            backgroundColor: filter === "incomplete" ? "rgb(0, 228, 164)" : "",
            color: filter === "incomplete" ? "black" : "",
            boxShadow: darkMode
              ? "0px 0px 10px 0px rgba(255, 255, 255, 0.2)"
              : "",
          }}
        >
          Incomplete
        </button>
      </div>
      <ul>{taskList}</ul>
    </main>
  );
}
