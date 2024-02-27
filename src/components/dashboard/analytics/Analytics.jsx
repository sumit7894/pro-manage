import React from 'react'
import styles from './analytics.module.css'
import useTaskContext from '../../../hooks/useTaskContext'
import ELLIPSE_IMG from '../../../utils/assests/ellipse.png'
const Analytics = () => {
  const {task} = useTaskContext();
  let dueDateCounts = 0;
  const categoryCounts = {
    BACKLOG: 0,
    'TO-DO': 0,
    PROGRESS: 0,
    DONE: 0,
};
const priorityCounts = {
  High: 0,
  Moderate: 0,
  Low: 0,
};
  console.log(categoryCounts);
  task.forEach((task) => {
  const { category,priority } = task;
  if (categoryCounts.hasOwnProperty(category)) {
      categoryCounts[category]++;
    }
  if (priorityCounts.hasOwnProperty(priority)) {
    priorityCounts[priority]++;
  }
  if(task?.dueDate){
    dueDateCounts++;
  }
});
  return (
    <div className={styles.main__analytics}>
      <div className={styles.heading}>Analytic</div>
      <div className={styles.card__container}>
        <div className={styles.status__summary}>
          <div className={styles.card}>
           <div>
           <img src={ELLIPSE_IMG} alt="bullet"/>
            <span>Backlog Tasks</span>
           </div>
          <div className={styles.count}>{categoryCounts.BACKLOG}</div>
          </div>

          <div className={styles.card}>
           <div>
           <img src={ELLIPSE_IMG} alt="bullet"/>
            <span>To-do Tasks</span>
           </div>
          <div className={styles.count}>{categoryCounts['TO-DO']}</div>
          </div>

          <div className={styles.card}>
           <div>
           <img src={ELLIPSE_IMG} alt="bullet"/>
            <span>In-Progress Tasks</span>
           </div>
          <div className={styles.count}>{categoryCounts.PROGRESS}</div>
          </div>

          <div className={styles.card}>
           <div>
           <img src={ELLIPSE_IMG} alt="bullet"/>
            <span>Completed Tasks</span>
           </div>
          <div className={styles.count}>{categoryCounts.DONE}</div>
          </div>
        </div>
        
        <div className={styles.priority__summary}>
        <div className={styles.card}>
           <div>
           <img src={ELLIPSE_IMG} alt="bullet"/>
            <span>Low Priority</span>
           </div>
          <div className={styles.count}>{priorityCounts.High}</div>
          </div>
          <div className={styles.card}>
           <div>
           <img src={ELLIPSE_IMG} alt="bullet"/>
            <span>Moderate Priority</span>
           </div>
          <div className={styles.count}>{priorityCounts.Moderate}</div>
          </div>
          <div className={styles.card}>
           <div>
           <img src={ELLIPSE_IMG} alt="bullet"/>
            <span>High Priority</span>
           </div>
          <div className={styles.count}>{priorityCounts.Low}</div>
          </div>
          <div className={styles.card}>
           <div>
           <img src={ELLIPSE_IMG} alt="bullet"/>
            <span>Due Date Tasks</span>
           </div>
          <div className={styles.count}>{dueDateCounts}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics