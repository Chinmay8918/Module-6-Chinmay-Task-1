import React, { useState, useEffect } from "react";
import { updateTodo } from "../api/api";

const TodoList = ({ todos, onEdit, onDelete, onDataUpdate }) => {
  const [checkboxStates, setCheckboxStates] = useState({});

  useEffect(() => {
    const initialStates = {};
    todos.forEach((todo) => {
      const savedState = checkboxStates[todo.id];
      if (savedState && savedState.length === todo.description.length) {
        initialStates[todo.id] = savedState;
      } else {
        initialStates[todo.id] = todo.description.map(() => false);
      }
    });
    setCheckboxStates(initialStates);
  }, [todos]);

  const handleCheckboxToggle = async (todoId, index) => {
    const todo = todos.find((t) => t.id === todoId);
    if (!todo) return;

    const updatedCheckboxes = [...(checkboxStates[todoId] || [])];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    const isCompleted = updatedCheckboxes.every((checked) => checked);

    setCheckboxStates((prev) => ({
      ...prev,
      [todoId]: updatedCheckboxes,
    }));

    const updatedTodo = {
      ...todo,
      isCompleted,
    };

    await updateTodo(todoId, updatedTodo);
    if (typeof onDataUpdate === "function") onDataUpdate();
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgb(255, 200, 200), rgb(200, 255, 255), rgb(200, 200, 255))",
      }}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-900 mb-6">
          Your Todo List
        </h1>
        {todos.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">
            No tasks available. Add some!
          </p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold text-indigo-700 mb-4">
                {todo.title}
              </h3>
              <ul className="space-y-2 mb-4">
                {todo.description.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checkboxStates[todo.id]?.[index] || false}
                      onChange={() => handleCheckboxToggle(todo.id, index)}
                      className="w-5 h-5 accent-indigo-600 cursor-pointer transition-all"
                    />
                    <span
                      className={`text-lg ${
                        checkboxStates[todo.id]?.[index]
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-sm mb-4 font-medium">
                Status:{" "}
                <span
                  className={
                    todo.isCompleted ? "text-green-600" : "text-orange-500"
                  }
                >
                  {todo.isCompleted ? "Completed" : "Pending"}
                </span>
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => onEdit(todo)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
