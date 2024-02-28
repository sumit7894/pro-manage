import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL, compareDate, findColor, getFormattedDate } from '../../utils/constants/constant';
import LOGO_IMG from '../../utils/assests/logo.png'
import styles from './taskdetails.module.css'
import { format } from 'date-fns';

const TaskDetails = () => {
    const { taskId } = useParams();
    const [task,setTask] = useState();
    const [loading,setLoading] = useState(true);
    console.log("this is task",task);
    const priority = task?.priority;
    const checklists = task?.checklists;
    const totalChecklist = checklists?.length;
    const countChecked = task?.countCompletedTask;
    const dueDate = task?.dueDate;
    const dueDateStatus = compareDate(dueDate);
    const priorityColor = findColor(priority);
    const formattedDueDate = getFormattedDate(task?.dueDate);
    
    const navigate = useNavigate();
    console.log(task);
    useEffect(() => {
    const fetchTask = async () => {
        try {
        const response = await axios.get(`${BASE_URL}/dashboard/task/${taskId}`); 
        setTask(response?.data?.data); 
        } catch (error) {
        console.error('Error fetching task:', error);
        if(error.response.status === 404)
        {
            navigate("/notfound");
        }
        } finally {
        setLoading(false); 
        }
    };
    fetchTask(); 
    }, [taskId]);
  return (
    <div className={styles.main__taskdetails}>
        <div className={styles.logo__container}>
            <img src={LOGO_IMG} alt='logo'/>
            <span>Pro Manage</span>
        </div>
        <div className={styles.task__summary}>
            <div className={styles.priority__container}>
                <div className={styles.priority}
                style={{backgroundColor:priorityColor}}/>
                <span>{task?.priority} Priority</span>
            </div>
            <div className={styles.title__container}>
                {task?.title}
            </div>
            <div className={styles.checklist__count__container}>
                Checklist ({countChecked}/{totalChecklist})
            </div>
            <div className={styles.checklist__container}>
                {checklists?.map((item)=>(
                    <div className={styles.checklist__card}>
                    <input type='checkbox'
                    checked={item?.checked}
                    className={styles.card__checkbox}/>
                    <div className={styles.checkbox__text}>{item?.text}</div>
                </div>
                ))}
            </div>
            {dueDate && (<div className={styles.due__date}>
                <span>Due Date</span>
                <div className={dueDateStatus ? styles.date__left : styles.date__over}>{formattedDueDate}</div>
            </div>)}
        </div>
    </div>
  )
}

export default TaskDetails