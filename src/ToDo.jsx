import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export function ToDo() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const addTask = () => {
        if (newTask.trim() === "") return;
        const newTasks = [...tasks, { task: newTask, completed: false }];
        setTasks(newTasks);
        setNewTask("");
    };

    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const moveTaskUp = (index) => {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    };

    const moveTaskDown = (index) => {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    };

    const toggleTaskCompletion = (index) => {
        const newTasks = tasks.map((task, i) => 
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks);
    };

    return (
        <>
            <div className="text-center">
                <h1 className="h1 mb-4">TODO APP</h1>
                <div className="container">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Enter a new task..."
                        />
                        <button className="btn btn-success" onClick={addTask}>
                            Ajouter
                        </button>
                    </div>
                </div>
                <div className="container">
                    <ul className="list-unstyled">
                        {tasks.map((task, index) => (
                            <li key={index} className="d-flex align-items-center justify-content-between mb-2">
                                <span
                                    style={{
                                        fontWeight: "bold",
                                        fontFamily: "Arial",
                                        fontSize: 23,
                                        textDecoration: task.completed ? 'line-through' : 'none'
                                    }}
                                >
                                    {task.task}
                                </span>
                                <div>
                                    <button
                                        className="btn btn-warning me-1"
                                        onClick={() => toggleTaskCompletion(index)}
                                    >
                                        {task.completed ? "Défaire" : "Fait"}
                                    </button>
                                    <button
                                        className="btn btn-danger me-1"
                                        onClick={() => deleteTask(index)}
                                    >
                                        <FaTrash />
                                    </button>
                                    <button className="btn btn-secondary me-1" onClick={() => moveTaskUp(index)}>
                                        UP
                                    </button>
                                    <button className="btn btn-secondary" onClick={() => moveTaskDown(index)}>
                                        Down
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
