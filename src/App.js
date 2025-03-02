import React, { useState } from 'react';
import TaskColumn from './TaskColumns';
import './App.css';
import { DragDropContext } from '@hello-pangea/dnd';


function App() {
  const [tasks, setTasks] = useState({
    pending: [
      { id: 'p1', content: 'Task 1' },
      { id: 'p2', content: 'Task 2' },
    ],
    inProgress: [
      { id: 'ip1', content: 'Task 3' },
    ],
    done: [
      { id: 'd1', content: 'Task 4' },
    ],
  });

  const [newTaskName, setNewTaskName] = useState('');

  const addTask = () => {
    if (!newTaskName.trim()) return;
    const totalTasks = Object.values(tasks).flat().length;
    const newTask =  {
      id: `p${totalTasks + 1}`,
      content: newTaskName,
    };
    setTasks((prevTasks) => ({
      ...prevTasks,
      pending: [...prevTasks.pending, newTask]
    }));
    setNewTaskName('');
  };

  const deleteTask = (columnId, taskId) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [columnId]: prevTasks[columnId].filter((task) => task.id !== taskId),
    }));
  };
   
  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log('Drag ended:', result); // Para depurar
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
    
    
    if (!destination) return;

    
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const newTasks = { ...tasks };
    const sourceColumn = newTasks[source.droppableId];
    const destColumn = newTasks[destination.droppableId];

    const [movedTask] = sourceColumn.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceColumn.splice(destination.index, 0, movedTask);
    } else {
      destColumn.splice(destination.index, 0, movedTask);
    }

    setTasks(newTasks);
  };


  return (
    <div className="App">
    <header className="App-header">
      <h1>Task Manager</h1>
      <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Enter task name"
          />
      <button onClick={addTask}>Add New Task</button>
    </header>
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="task-container">
      <TaskColumn title='Pending' tasks={tasks.pending} droppableId="pending" onDelete={deleteTask} />
      <TaskColumn title='In Progress' tasks={tasks.inProgress} droppableId="inProgress" onDelete={deleteTask} />
      <TaskColumn title='Done' tasks={tasks.done} droppableId="done" onDelete={deleteTask} />
    </div>
    </DragDropContext>
  </div>



  )
}

export default App;
