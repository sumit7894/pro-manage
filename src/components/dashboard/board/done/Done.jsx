import React from 'react'
import styles from './done.module.css'
const Done = () => {
  return (
    <div className={styles.done__main}>
    done
    <div className={styles.testing}>
        {[0,1].map(()=>(
            <div>hello</div>
        ))}
    </div>
</div>
  )
}

export default Done