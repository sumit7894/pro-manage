import React from 'react'
import styles from './backlog.module.css'
const Backlog = () => {
    const name = "hello"
  return (
    <div className={styles.backlog__main}>
        <div className={styles.backlog__container}>
            <span className={styles.backlog__heading}>
                Backlog
            </span>
            
        </div>
    </div>
  )
}

export default Backlog