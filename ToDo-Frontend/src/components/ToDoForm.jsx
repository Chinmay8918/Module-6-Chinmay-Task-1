import React, { useState, useEffect } from "react";

const TodoForm = ({ onSubmit, editingTodo, clearEdit }) => {
  const [title, setTitle] = useState("");
  const [rawDescription, setRawDescription] = useState("");

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setRawDescription(editingTodo.description.join(" "));
    } else {
      setTitle("");
      setRawDescription("");
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !rawDescription.trim()) return;

    const descriptionArray = rawDescription
      .split(/[\s,.-]+/)
      .filter((item) => item.trim() !== "")
      .map((text) => text.trim());

    const todoData = {
      title,
      description: descriptionArray,
    };

    if (editingTodo?.id) {
      todoData.id = editingTodo.id;
    }

    onSubmit(todoData);
    setTitle("");
    setRawDescription("");
    if (typeof clearEdit === "function") {
      clearEdit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Title :  add your title "
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded mb-2"
        required
      />
      <input
        type="text"
        placeholder="Description : Add your task "
        value={rawDescription}
        onChange={(e) => setRawDescription(e.target.value)}
        className="w-full border p-2 rounded mb-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {editingTodo ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default TodoForm;
