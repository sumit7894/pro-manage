import React, {  useState } from 'react'
import styles from './backlog.module.css'
import axios from 'axios'
import { BASE_URL } from '../../../../../utils/constants/constant'
import useTaskContext from '../../../../../hooks/useTaskContext'
const BacklogTaskCard = ({card,task,isExpanded, onToggle}) => {
  const [showDropDown,setDropDown] = useState(false);
  const {setEditTask,setTaskTitle,setSelectedPriority,setChecklists,
  setCountCompletedTask,setDueDate} = useTaskContext();
  const handleEdit =()=>{
    setEditTask(true);
    const title = card?.title;
    const count = card?.countCompletedTask;
    const totalChecklist = card?.checklists?.length;
    setTaskTitle(title);
    setSelectedPriority(card.priority);
    setChecklists(card.checklists);
    setCountCompletedTask(card.countCompletedTask);
    setDueDate(card.dueDate);
  }
  const handleMoveTask = async(category,taskId)=>{
    try {
      const data = {taskId,category};
      const response = await axios.patch(`${BASE_URL}/user/category/update`,data);
      console.log(data);
      console.log(response);
    } catch (error) {
      
    }
  }

  useState(()=>{

  },[task])
  const title = card?.title;
  const count = card?.countCompletedTask;
  const totalChecklist = card?.checklists?.length;
  return (
    <div className={styles.card__container}>
      <div className={styles.card__header}>
        <span>{card.priority}</span>
        <div className={styles.card__dropdown}
        onClick={()=>setDropDown((prev)=>!prev)}
        >
          ...
        </div>
        {showDropDown&&(<div className={styles.card__dropdown__menu}>
          <div onClick={handleEdit}>Edit</div>
          <div>Share</div>
          <div>Delete</div>
        </div>)}
      </div>
      <div className={styles.card__title}>
        {title}
      </div>
      <div className={styles.checklist__container}>
        Checklist ({count}/{totalChecklist})
        <div className={styles.toggle__button}
        onClick={onToggle}
        >
        button
      </div>
      </div>
      {isExpanded && card?.checklists?.map((item, index) => (
      <div className={styles.card__checklist} key={item._id}>
    <input 
      type='checkbox'
      className={styles.checklist__text}
      checked={item?.checked}
    />
    <div>{item.text}</div>
  </div>
))}
      <div className={styles.card__footer}>
        <span>date</span>
        <div className={styles.card__footer__controls}>
          <div className={styles.category__button}
          onClick={()=>handleMoveTask('todo',card._id)}
          >TO-DO</div>
          <div className={styles.category__button}
          onClick={()=>handleMoveTask('inprogress',card._id)}
          >
            PROGRESS
          </div>
          <div className={styles.category__button}
          onClick={()=>handleMoveTask('done',card._id)}
          >DONE</div>
        </div>
      </div>
    </div>
  )
}

export default BacklogTaskCard