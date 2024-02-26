import React from 'react'
import styles from './edittask.module.css'
import EditForm from '../EditForm/EditForm'
const EditTask = () => {
  return (
    <div className={styles.popup__overlay}>
    <div className={styles.create__task__main}>
    <EditForm/>
    </div>
    </div>
  )
}

export default EditTask