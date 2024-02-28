import React, { useEffect, useState } from 'react'
import styles from './todo.module.css'
import useTaskContext from '../../../../hooks/useTaskContext'
import TaskCard from '../TaskCard/TaskCard';
import COLLAPSE_IMG from '../../../../utils/assests/collapse.png'
const Todo = () => {
    const {setShowCreateTask,task}
     = useTaskContext();
    const [expandedCards, setExpandedCards] = useState([]);
    const handleCreateButton =()=>{
        setShowCreateTask(true);
    }

    const handleToggle = (cardId) => {
      setExpandedCards((prevExpanded) =>
        prevExpanded?.includes(cardId)
          ? prevExpanded?.filter((id) => id !== cardId)
          : [...prevExpanded, cardId]
      );
    };
  
    const handleCollapseAll = () => {
      setExpandedCards([]);
    };

  return (
    <div className={styles.todo__main}>
        <div className={styles.todo__container}>
            <div className={styles.todo__header}>
            <span className={styles.todo__heading}>
                To do
            </span>

            <div className={styles.header__controller}>
            <div className={styles.todo__create__button}
            onClick={handleCreateButton}
            >
            +
            </div>
            <div className={styles.todo__minimize__button}
            onClick={handleCollapseAll}
            >
              <img src={COLLAPSE_IMG} alt='minimize'/>
            </div>
            </div>
            </div>
        <div className={styles.card__container}>
        {task
          ?.filter(task => task?.category === "TO-DO")
          ?.map(item => (
            <TaskCard card={item} task={task}
            isExpanded={expandedCards.includes(item._id)}
            onToggle={() => handleToggle(item._id)}
            />
          ))}
        </div>
        </div>
    </div>
  )
}

export default Todo