import React from 'react'
import styles from './sidebar.module.css'
import LOGO_IMG from '../../../utils/assests/logo.png'
import BOARD_IMG from '../../../utils/assests/layout.png'
import ANALYTICS_IMG from '../../../utils/assests/analytic.png'
import SETTINS_IMG from '../../../utils/assests/setting.png'
import useTaskContext from '../../../hooks/useTaskContext'
import LOGOUT_IMG from '../../../utils/assests/logout.png'
const Sidebar = () => {
  const {selectedMenu,setSelectedMenu,setShowLogout} = useTaskContext();
  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__header}>
      <div className={styles.sidebar__logo}>
      <img src={LOGO_IMG} alt='logo'/> PRO MANAGE
      </div>

      <div className={styles.sidebar__navigation}>
        <div className={styles.control__button__container}
        onClick={()=>setSelectedMenu(1)}
        style={{backgroundColor : selectedMenu===1 ? "rgba(67, 145, 237, 0.1)" : ""}}
        >
        <div className={styles.control__button}>
        <img src={BOARD_IMG} alt='board'/>
        <span>Board</span>
        </div>
        </div>

        <div className={styles.control__button__container}
        onClick={()=>setSelectedMenu(2)}
        style={{backgroundColor : selectedMenu===2 ? "rgba(67, 145, 237, 0.1)" : ""}}
        >
        <div className={styles.control__button}>
        <img src={ANALYTICS_IMG} alt='analytics'/>
        <span>Analytics</span>
        </div>
        </div>

        <div className={styles.control__button__container}
        onClick={()=>setSelectedMenu(3)}
        style={{backgroundColor : selectedMenu===3 ? "rgba(67, 145, 237, 0.1)" : ""}}
        >
        <div className={styles.control__button}>
        <img src={SETTINS_IMG} alt='setting'/>
        <span>Settings</span>
        </div>
        </div>

      </div>
      </div>
      <div className={styles.logout__button}
      onClick={()=>setShowLogout(true)}
      >
        <img src={LOGOUT_IMG} alt='logout'/>
        Log out
      </div>
    </div>
  )
}

export default Sidebar