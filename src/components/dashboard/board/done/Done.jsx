import React, { useEffect, useState } from 'react'
import styles from './done.module.css'
import useTaskContext from '../../../../hooks/useTaskContext';
import TaskCard from '../TaskCard/TaskCard';
const Done = () => {
  const {setShowCreateTask,task}
     = useTaskContext();
    const [expandedCards, setExpandedCards] = useState([]);

    // useEffect(()=>{

    // },[task])

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
    <div className={styles.done__main}>
    <div className={styles.backlog__container}>
        <div className={styles.backlog__header}>
        <span className={styles.backlog__heading}>
            Done
        </span>

        <div className={styles.header__controller}>
        <div className={styles.todo__minimize__button}
        onClick={handleCollapseAll}
        >
            -
        </div>
        </div>
        </div>
    <div className={styles.card__container}>
    {task?.filter(task => task?.category === "DONE")
      ?.map(item => (
        <TaskCard card={item} task={task}
        isExpanded={expandedCards?.includes(item._id)}
        onToggle={() => handleToggle(item._id)}
        />
      ))}
    </div>
    </div>
  </div>
  )
}

export default Done