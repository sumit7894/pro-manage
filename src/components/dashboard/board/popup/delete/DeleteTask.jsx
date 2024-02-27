import React from 'react'
import styles from './deletetask.module.css'
import useTaskContext from '../../../../../hooks/useTaskContext'
import toast,{ Toaster } from 'react-hot-toast'
import axios from 'axios'
import { BASE_URL } from '../../../../../utils/constants/constant'
const DeleteTask = () => {
    const {setShowDeleteTask,taskId} = useTaskContext();
    const handleDelete = async()=>{
        try {
            const response = await axios.delete(`
            ${BASE_URL}/user/task/delete/
            `,{
            data:{taskId},
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }
        })
            toast.success("Task Deleted Successfully");
            setTimeout(()=>{
                setShowDeleteTask(false);
            },2000);
            console.log(response);
        } catch (error) {
            toast.error("Somthing went wrong");
        }
    }
  return (
    <div className={styles.popup__overlay}>
        <div className={styles.delete__task__main}>
            <span className={styles.delete__heading}>
            Are you sure you want to Delete?
            </span>
            <button className={styles.delete__button}
            onClick={handleDelete}
            >
                Yes, Delete
            </button>
            <button className={styles.cancel__button}
            onClick={()=>setShowDeleteTask(false)}
            >
                Cancel
            </button>
        </div>
        <Toaster/>
    </div>
  )
}

export default DeleteTask