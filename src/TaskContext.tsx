import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { KanbanBoardContainer } from './components/tasks/kanban/board';
import { KanbanColumnSkeleton, ProjectCardSkeleton } from './components';

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate?: Date;
  completed: boolean;
  stageId?: string | null;
  users: { id: string; name: string; avatarUrl: string }[];
  createdAt: string;
  updatedAt: string;
};

type TaskStage = {
  id: string;
  title: string;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
};

type TaskContextType = {
    tasks: Task[];
    stages: TaskStage[];
    addTask: (newTask: Task) => void;
    deleteTaskFromContext: (taskId: string) => void; 
    updateTask: (updatedTask: Task) => void; // <-- New function
    refreshTasks: () => void;
    selectedTaskId: string | null;
    setSelectedTaskId: (id: string | null) => void;
    openEditModal: (taskId: string) => void;
    closeEditModal: () => void;
  };


const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: React.PropsWithChildren) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stages, setStages] = useState<TaskStage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/');
    //   const response = await axios.get('https://refine-dashboard-5.onrender.com/');
      setTasks(response.data.tasks);
      setStages(response.data.taskStages);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  // Delete task from context------>
  const deleteTaskFromContext = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };
  // Delete task from context<------

  // New function to update a specific task
  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };
  const refreshTasks = () => {
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const openEditModal = (taskId: string) => {
    setSelectedTaskId(taskId);
    // Any other actions to open modal
  };

  const closeEditModal = () => {
    setSelectedTaskId(null);
    // Any other actions to close modal
  };
  return (
    <TaskContext.Provider value={{ tasks, stages, addTask,deleteTaskFromContext, updateTask, refreshTasks,selectedTaskId, setSelectedTaskId, openEditModal, closeEditModal }}>
      {!isLoading ? children :<PageSkeleton/>}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};


// Skeleton for loading state
const PageSkeleton = () => {
    const columnCount = 6;
    const itemCount = 4;
  
    return (
      <KanbanBoardContainer>
        {Array.from({ length: columnCount }).map((_, index) => (
          <KanbanColumnSkeleton key={index}>
            {Array.from({ length: itemCount }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </KanbanColumnSkeleton>
        ))}
      </KanbanBoardContainer>
    );
  };
  