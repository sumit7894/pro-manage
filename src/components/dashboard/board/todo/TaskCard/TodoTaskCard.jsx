import React, {  useState } from 'react'
import styles from './todocard.module.css'
import axios from 'axios'
import { BASE_URL, findColor } from '../../../../../utils/constants/constant'
import useTaskContext from '../../../../../hooks/useTaskContext'
import ARROW_DOWN_IMG from '../../../../../utils/assests/arrow-down.png'
import ARROW_UP_IMG from '../../../../../utils/assests/arrow-up.png'
import toast,{ Toaster } from 'react-hot-toast'
const TodoTaskCard = ({card,task,isExpanded, onToggle}) => {
  const [showDropDown,setDropDown] = useState(false);
  const {setEditTask,setTaskTitle,setSelectedPriority,setChecklists,
  setCountCompletedTask,setDueDate,setShowDeleteTask,setTaskId} = useTaskContext();
  const priorityColor = findColor(card.priority);
  
  const handleDelete =()=>{
    setShowDeleteTask(true);
    setTaskId(card._id);
  }

  const handleShare =()=>{
    const textToCopy = `http://localhost:3000/dashboard/user/${card._id}`; 

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        toast.success("Link copied");
      })
  }
  
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
      <Toaster/>
      <div className={styles.card__header}>
        <div className={styles.priority__container}>
        <div className={styles.color__container}>
        <div className={styles.priority__color}
        style={{backgroundColor:priorityColor}}/>
        {card.priority} Priority
        </div>
        <div className={styles.card__dropdown}
        onClick={()=>setDropDown((prev)=>!prev)}
        >...
        </div>
        </div>
        {showDropDown&&(<div className={styles.card__dropdown__menu}>
          <div onClick={handleEdit}
          className={styles.edit__button}
          >Edit</div>
          <div className={styles.share__button}
          onClick={handleShare}
          >
          Share
          </div>
          <div className={styles.delete__button}
          onClick={handleDelete}
          >
          Delete
        </div>
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
          {isExpanded ? <img src={ARROW_UP_IMG} alt='arrow-up'/>:
          <img src={ARROW_DOWN_IMG} alt='arrow-down'/>
          }
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
        <div className={styles.card__date}>
          date
        </div>
        <div className={styles.card__footer__controls}>
          <div className={styles.category__button}
          onClick={()=>handleMoveTask('backlog',card._id)}
          >BACKLOG</div>
          <div className={styles.category__button}
          onClick={()=>handleMoveTask('inprogress',card._id)}
          >
            PROGRESS
          </div>
          <div className={styles.category__button}
          onClick={()=>handleMoveTask('done',card._id)}
          >
            DONE
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoTaskCard