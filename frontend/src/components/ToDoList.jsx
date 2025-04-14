import React from "react";

const TodoList = ({
  tasks,
  deleteTask,
  updateTask,
  editingTitle,
  setEditingTitle,
  editingTaskId,
  setEditingTaskId,
  startEditing,
  handleEditChange,
}) => {

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => updateTask(task._id, { completed: !task.completed })}
          />
          {editingTaskId === task._id ? (
            <>
              <input type="text" value={editingTitle} onChange={handleEditChange} />
              <button
                onClick={() => {
                  updateTask(task._id, { title: editingTitle });
                  setEditingTaskId(null);
                }}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                {task.title}
              </span>

              <div>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
                <button
                  onClick={() => {
                    startEditing(task._id);
                    setEditingTitle(task.title);
                  }}
                >
                  Edit
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
