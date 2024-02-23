import React from 'react'
import styles from './todo.module.css'
import useTaskContext from '../../../../hooks/useTaskContext'
const Todo = () => {
    const {showCreateTask,setShowCreateTask} = useTaskContext();
    const handleCreateButton =()=>{
        setShowCreateTask(true);
    }

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
            <div className={styles.todo__minimize__button}>
                -
            </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Todo