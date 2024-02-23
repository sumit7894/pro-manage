const {createContext, useState, useRef} = require('react')

const TaskContext = createContext();

const Provider = ({children})=>{
    const [isAuthenticated,setIsAuthenticated] = useState();
    const [selectedMenu,setSelectedMenu] = useState(1);
    const [showCreateTask,setShowCreateTask] = useState(false);

    const [taskTitle, setTaskTitle] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('Low');
  const [checklists, setChecklists] = useState([]);
  const checklistInputRef = useRef(null); 
  const [countCompletedTask,setCountCompletedTask] = useState(0);
  const [dueDate,setDueDate] = useState();
const value = 
{
selectedMenu,
setSelectedMenu,
isAuthenticated,
setIsAuthenticated,
showCreateTask,
setShowCreateTask,
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
setDueDate
}
return (<TaskContext.Provider value={value}>{children}</TaskContext.Provider>)
};
export {Provider};

export default TaskContext;