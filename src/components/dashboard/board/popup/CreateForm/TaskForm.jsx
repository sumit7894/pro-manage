import React, { useState, useRef, useEffect } from 'react';
import useTaskContext from '../../../../../hooks/useTaskContext';
import axios from 'axios';
import { BASE_URL } from '../../../../../utils/constants/constant';

function TaskForm() {

    const {taskTitle,setTaskTitle,selectedPriority,setSelectedPriority,
    checklists,setChecklists,checklistInputRef,countCompletedTask,
    setCountCompletedTask,dueDate,setDueDate,task,setTask,setShowCreateTask,category} = useTaskContext();
  
  useEffect(()=>{
    
  },[setTask])
  const handleTaskTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };
  

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

  const handleSubmitTask = async(e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    const data ={userId,taskTitle,selectedPriority,checklists,countCompletedTask,dueDate,category}
    console.log("this is data",data);
    setTask((prevState) => [...prevState, data]);
    console.log(data);
    setShowCreateTask(false);
    try {
        const response = await axios.post(`${BASE_URL}/user/task`,data);
        console.log(response);
    } catch (error) {
        
    }

    setTaskTitle('');
    setSelectedPriority('Low');
    setChecklists([]);
    setCountCompletedTask(0);
    setDueDate("");
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
    <form>
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
      <input type='date'
      placeholder='Due Date'
      value={dueDate}
      onChange={(e)=>setDueDate(e.target.value)}
      />
      <button onClick={handleSubmitTask}>Submit</button>
      </form>
   );
} 
export default TaskForm;