import React from 'react'
import styles from './logout.module.css'
import useTaskContext from '../../../../../hooks/useTaskContext'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
    const navigate = useNavigate();
    const {setShowLogout,setIsLoggedIn} = useTaskContext();
    const handleLogout =()=>{  
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("userId");
        navigate("/");
        setShowLogout(false);
    }
  return (
    <div className={styles.popup__overlay}>
        <div className={styles.logout__main}>
        <span className={styles.logout__heading}>
            Are you sure you want to Delete?
            </span>
            <button className={styles.logout__button}
            onClick={handleLogout}
            >
                Yes, Logout
            </button>
            <button className={styles.cancel__button}
            onClick={()=>setShowLogout(false)}
            >
                Cancel
            </button>
        </div>
    </div>
  )
}

export default Logout