import React, { useState } from 'react'
import styles from './authform.module.css'
import USER_IMG from '../../../utils/assests/user_icon.png'
import EMAIL_IMG from '../../../utils/assests/mail.png'
import LOCK_IMG from '../../../utils/assests/lock.png'
import EYE_IMG from '../../../utils/assests/eye.png'
const AuthForm = () => {
  const [togglePass,setTogglePass] = useState(false);
  const [toggleConfirmPass,setToggleConfirmPass] = useState(false);
  return (
    <div className={styles.main__auth}>
      <span className={styles.auth__heading}>Register</span>
      <div className={styles.auth__form__container}>
        <form onSubmit={(e)=>e.preventDefault()}>
          <div className={styles.input__container}>
            <img src={USER_IMG} alt='name'/>
            <input type='text' placeholder='Name'/>
          </div>
          <div className={styles.input__error}> Wrong name</div>

          <div className={styles.input__container}>
          <img src={EMAIL_IMG} alt='email'/>
            <input type='email' placeholder='Email'/>
          </div>
          <div className={styles.input__error}> Wrong name</div>

          <div className={styles.input__container}>
          <img src={LOCK_IMG} alt='password'/>
            <input type={togglePass ? "text":"password"} placeholder='Password'/>
            <img src={EYE_IMG} alt='toggleview'
            onClick={()=>setTogglePass(!togglePass)}
            />
          </div>
          <div className={styles.input__error}> Wrong name</div>

          <div className={styles.input__container}>
          <img src={LOCK_IMG} alt='password'/>
          <input type={toggleConfirmPass ? "text":"password"} placeholder='Confirm Password'/>
          <img src={EYE_IMG} alt='toggleview'
          onClick={()=>setToggleConfirmPass(!toggleConfirmPass)}
          />
          </div>
          <div className={styles.input__error}> Wrong name</div>

        <button className={styles.submit__button}>
          Register
        </button>
        </form>
      </div>
      <span className={styles.bottom__heading}>
          Have an account ?
        </span>
        <button className={styles.toggle__button}>
          Log In
        </button>
    </div>
  )
}

export default AuthForm