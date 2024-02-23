import React from 'react'
import styles from './inprogress.module.css'
const InProgress = () => {
  return (
    <div className={styles.inprogress__main}>
    inprogress
    <div className={styles.testing}>
        {[0,1].map(()=>(
            <div>hello</div>
        ))}
    </div>
</div>
  )
}

export default InProgress