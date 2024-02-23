import React from 'react'
import styles from './createtask.module.css'
import TaskForm from '../CreateForm/TaskForm'
const CreateTask = () => {
  return (
    <div className={styles.popup__overlay}>
        <div className={styles.create__task__main}>
        <TaskForm/>
        </div>
    </div>
  )
}

export default CreateTask