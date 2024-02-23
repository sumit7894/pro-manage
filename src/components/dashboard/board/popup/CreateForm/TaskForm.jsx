import React, { useState, useRef, useEffect } from 'react';
import useTaskContext from '../../../../../hooks/useTaskContext';

function TaskForm() {
//   const [taskTitle, setTaskTitle] = useState('');
//   const [selectedPriority, setSelectedPriority] = useState('Low');
//   const [checklists, setChecklists] = useState([]);
//   const checklistInputRef = useRef(null); 
//   const [countCompletedTask,setCountCompletedTask] = useState(0);
//   const [dueDate,setDueDate] = useState();

    const {taskTitle,setTaskTitle,selectedPriority,setSelectedPriority,
    checklists,setChecklists,checklistInputRef,countCompletedTask,setCountCompletedTask} = useTaskContext();
  const handleTaskTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };
  const data ={taskTitle,selectedPriority,checklists,countCompletedTask}
  console.log(data);
  const handlePriorityChange = (priority) => {
    setSelectedPriority(priority);
  };

  const handleAddChecklist = () => {
    setChecklists([...checklists, { text: '' }]); 
  };

  const handleChecklistInputChange = (index, e) => {
    const updatedChecklists = [...checklists];
    updatedChecklists[index].text = e.target.value;
    setChecklists(updatedChecklists);
  };

  const handleChecklistDelete = (index) => {
    const updatedChecklists = [...checklists];
    updatedChecklists.splice(index, 1);
    setChecklists(updatedChecklists);
    if(checklists[index].checked){
        setCountCompletedTask((prev)=>prev-1)
    }
  };

  const handleSubmitTask = (e) => {
    e.preventDefault();

    
    console.log('Task:', {
      title: taskTitle,
      priority: selectedPriority,
      checklists,
    });

    setTaskTitle('');
    setSelectedPriority('Low');
    setChecklists([]);
  };

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && checklistInputRef.current && checklistInputRef.current.focus()) {
        handleAddChecklist();
      }
    });

    return () => {
      document.removeEventListener('keydown', handleAddChecklist);
    };
  }, []);

  return (
    <form onSubmit={handleSubmitTask}>
      <h2>Create Task</h2>
      <div>
        <label htmlFor="taskTitle">Task Title:</label>
        <input
          type="text"
          id="taskTitle"
          value={taskTitle}
          onChange={handleTaskTitleChange}
          required
        />
      </div>
      <div>
        <label>Priority:</label>
        <button
          type="button"
          onClick={() => handlePriorityChange('High')}
          className={selectedPriority === 'High' ? 'active' : ''}
        >
          High
        </button>
        <button
          type="button"
          onClick={() => handlePriorityChange('Moderate')}
          className={selectedPriority === 'Moderate' ? 'active' : ''}
        >
          Moderate
        </button>
        <button
          type="button"
          onClick={() => handlePriorityChange('Low')}
          className={selectedPriority === 'Low' ? 'active' : ''}
        >
          Low
        </button>
      </div>
      <p>
        Checklist Completion: {countCompletedTask}/{checklists.length}
      </p>
      <div>
        <button type="button" onClick={handleAddChecklist}>
          Add Checklist Item
        </button>
      </div>
      {checklists.map((item, index) => (
        <div key={index} className="checklist-item">
          <input
            type="checkbox"
            checked={item.checked || false}
            onChange={() => {
              if(!item.checked){
                setCountCompletedTask((prev)=> prev+1)
              }else{
                setCountCompletedTask((prev)=> prev-1)
              }
              const updatedChecklists = [...checklists];
              updatedChecklists[index].checked = !updatedChecklists[index].checked;
              setChecklists(updatedChecklists);
            }}
          />
          <input
            type="text"
            value={item.text}
            onChange={(e) => handleChecklistInputChange(index, e)}
            required
          />
          <button type="button" onClick={() => handleChecklistDelete(index)}>
            Delete
          </button>
        </div>
      ))}
      <input type='date' placeholder='Due Date'/>
      </form>
   );
} 
export default TaskForm;