"use client";
import React, { useState,memo,useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";
import Options from "../../../assets/TaskCard/options.png";
import MessageIcon from "../../../assets/TaskCard/messageicon.png";
import FolderIcon from "../../../assets/TaskCard/folder-2.png";
const TaskCard = memo(({
  _id,
  taskName,
  description,
  priority,
  commentsCount,
  filesCount,
  collaborators,
  onDelete,
  setTasks,
   tasks  // Function to handle card deletion
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: _id,
  });

  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");

  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Fix SSR issue
  useEffect(() => {
    // Initialize subtasks from the main tasks array
    const task = tasks.find(t => t._id === _id);
    if (task && task.subtasks) {
      setSubtasks(task.subtasks);
    }
  }, [tasks, _id]);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  const style = transform
  ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
  : undefined;

 
  const addSubtask = () => {
    if (newSubtask.trim() === "") return;
    const updatedTasks = tasks.map(task => 
      task._id === _id ? { ...task, subtasks: [...subtasks, newSubtask] } : task
    );
    setTasks(updatedTasks);
    setNewSubtask("");
  };
  
  const deleteSubtask = (index) => {
    const updatedTasks = tasks.map(task => 
      task._id === _id ? { ...task, subtasks: task.subtasks.filter((_, i) => i !== index) } : task
    );
    setTasks(updatedTasks);
  };

  

  const priorityColors = {
    High: "bg-red-100 text-red-500",
    Mid: "bg-yellow-100 text-yellow-500",
    Low: "bg-green-100 text-green-500",
  };

  // Function to toggle delete button visibility
  const toggleDeleteButton = () => {
    setShowDeleteButton((prev) => !prev);
  };

  // Function to handle card deletion
  const handleDeleteCard = () => {
    console.log("Deleting card with ID:", _id); 
    if (onDelete) {
      onDelete(_id); 
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 bg-white shadow-lg rounded-xl space-y-2 cursor-grab relative"
    >
      {/* Delete Button (conditionally rendered) */}
      {showDeleteButton && (
        <button
          onClick={handleDeleteCard}
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm"
        >
          Delete Card
        </button>
      )}

      <div className="flex justify-between relative">
        <span
          className={`px-2 py-1 text-sm font-semibold rounded ${priorityColors[priority]}`}
        >
          {priority}
        </span>
        <div>
          <button onClick={toggleDeleteButton}>
            <Image
              src={Options}
              alt="Options"
              className="w-[16px] h-[19px] object-contain mx-2"
            />
          </button>
        </div>
      </div>

      <h3 className="text-[18px] font-bold">{taskName}</h3>
      <p className="text-[12px] text-[#787486]">{description}</p>

      {/* Subtask Section */}
      <div style={style} className="mt-2">
      <h4 className="text-sm font-medium mb-2">Subtasks</h4>
      {subtasks.length === 0 ? (
        <p className="text-gray-500 text-sm">No subtasks</p>
      ) : (
        subtasks.map((subtask, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-50 p-2 rounded mb-1"
          >
            <span className="text-sm">{subtask}</span>
            <button
              onClick={() => deleteSubtask(index)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        ))
      )}

      {/* Add Subtask Input */}
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          placeholder="Add a subtask"
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)} 
          className="w-full p-1 border rounded text-sm"
        />
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
          onClick={addSubtask}
        >
          Add
        </button>
       
      </div>

    </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex -space-x-2">
          {collaborators.map((collab, index) => (
            <img
              key={index}
              src={collab.avatar}
              alt="avatar"
              className="w-[24px] h-[24px] rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>
        <div className="flex text-gray-500 text-sm">
          <Image
            src={MessageIcon}
            alt="MessageIcon"
            className="w-[16px] h-[16px] mt-1 mx-2"
          />
          <p>{commentsCount} comments</p>
          <Image
            src={FolderIcon}
            alt="FolderIcon"
            className="w-[16px] h-[16px] mt-1 mx-2"
          />
          <p>{filesCount} files</p>
        </div>
      </div>
    </div>
  );
});

export default TaskCard;