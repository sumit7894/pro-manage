const {createContext, useState, useRef} = require('react')

const TaskContext = createContext();

const Provider = ({children})=>{
  const [isAuthenticated,setIsAuthenticated] = useState();
  const [selectedMenu,setSelectedMenu] = useState(1);
  const [showCreateTask,setShowCreateTask] = useState(false);
  const [showEditTask,setEditTask] = useState(false);
  const [showDeleteTask,setShowDeleteTask] = useState(false);
  const [taskId,setTaskId] = useState();
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('Low');
  const [checklists, setChecklists] = useState([]);
  const checklistInputRef = useRef(null); 
  const [countCompletedTask,setCountCompletedTask] = useState(0);
  const [dueDate,setDueDate] = useState();
  const [category,setCategory] = useState("todo");
  const [task,setTask] = useState();
const value = 
{
selectedMenu,
setSelectedMenu,
isAuthenticated,
setIsAuthenticated,
showCreateTask,
setShowCreateTask,
showEditTask,
setEditTask,
showDeleteTask,
setShowDeleteTask,
taskTitle,
setTaskTitle,
selectedPriority,
setSelectedPriority,
checklists,
setChecklists,
checklistInputRef,
countCompletedTask,
setCountCompletedTask,
dueDate,
setDueDate,
taskId,
setTaskId,
task,
setTask,
category,
setCategory
}
return (<TaskContext.Provider value={value}>{children}</TaskContext.Provider>)
};
export {Provider};

export default TaskContext;