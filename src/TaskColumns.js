import './TaskColumn.css';
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';


function TaskColumn({ title, tasks, droppableId, onDelete }) {
    return (
        <Droppable droppableId={droppableId} isDropDisabled={false} >
        {(provided) => (
          <div
            className="task-column"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2>{title}</h2>
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id}
                index={index}
                
              >
                {(provided) => (
                  <div
                    className="task-item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {task.content}
                    <button
                    onClick={() => onDelete(droppableId, task.id)}
                    className="delete-btn"
                  >
                    X
                  </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      
    );
  }

export default TaskColumn;