import React from 'react'
import styles from './banner.module.css'
import Robot from '../../../utils/assests/robot.png'
const Banner = () => {
  return (
    <div className={styles.main__banner}>
      <img src={Robot} alt='robot' className={styles.banner__image}/>
      <div className={styles.circle__div}/>
      <span className={styles.banner__heading}>
      Welcome aboard my friend 
      </span>
      <span className={styles.banner__subheading}>
      just a couple of clicks and we start
      </span>
    </div>
  )
}

export default Banner