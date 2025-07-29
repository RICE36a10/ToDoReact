import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      setTasks([...tasks, trimmed]);
      setText("");
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const moveTask = (from, to) => {
    setTasks((prev) => {
      const updated = [...prev];
      const [item] = updated.splice(from, 1);
      updated.splice(to, 0, item);
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>

      <form onSubmit={addTask} className="flex w-full max-w-md gap-2 mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task"
          className="flex-grow p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>

      <ul className="w-full max-w-md">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-white p-2 mb-2 rounded shadow"
          >
            <span>{task}</span>
            <div className="flex gap-2">
              <button
                onClick={() => moveTask(index, index - 1)}
                disabled={index === 0}
                className="bg-gray-200 px-2 py-1 rounded disabled:opacity-50"
              >
                Up
              </button>
              <button
                onClick={() => moveTask(index, index + 1)}
                disabled={index === tasks.length - 1}
                className="bg-gray-200 px-2 py-1 rounded disabled:opacity-50"
              >
                Down
              </button>
              <button
                onClick={() => deleteTask(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
