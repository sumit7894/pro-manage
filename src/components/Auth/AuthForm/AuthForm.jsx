import React, { useState } from 'react'
import styles from './authform.module.css'
import USER_IMG from '../../../utils/assests/user_icon.png'
import EMAIL_IMG from '../../../utils/assests/mail.png'
import LOCK_IMG from '../../../utils/assests/lock.png'
import EYE_IMG from '../../../utils/assests/eye.png'
import { checkConfirmPassword, checkEmail, checkName,  checkPassword } from '../../../utils/validation/validate'
const AuthForm = () => {
  const [isRegistration,setIsRegistration] = useState(true);
  const [togglePass,setTogglePass] = useState(false);
  const [toggleConfirmPass,setToggleConfirmPass] = useState(false);
  const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [confirmPassword,setConfirmPassword] = useState();
  const [error,setError] = useState({
    nameError:"",
    emailError:"",
    passwordError:"",
    confirmPasswordError:""
  })
  
  const handleRegistration =()=>{
    const newError ={};
    newError.nameError = checkName(name);
    newError.emailError = checkEmail(email);
    newError.passwordError =checkPassword(password);
    console.log(password);
    newError.confirmPasswordError = checkConfirmPassword(password,confirmPassword);
    setError(newError);
    console.log(error.passwordError);
  }
  return (
    <div className={styles.main__auth}>
      <span className={styles.auth__heading}>
        {isRegistration ? "Register" : "Login"}
      </span>
      <div className={styles.auth__form__container}>
        <form onSubmit={(e)=>e.preventDefault()}>
          {isRegistration && (<div className={styles.input__container}>
            <img src={USER_IMG} alt='name'/>
            <input type='text' placeholder='Name'
            onChange={(e)=>setName(e.target.value)}
            />
          </div>)}
         {isRegistration && ( <div className={styles.input__error}> {error.nameError}</div>)}

          <div className={styles.input__container}>
          <img src={EMAIL_IMG} alt='email'/>
            <input type='email' placeholder='Email'
            onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className={styles.input__error}> {error.emailError}</div>

          <div className={styles.input__container}>
          <img src={LOCK_IMG} alt='password'/>
            <input type={togglePass ? "text":"password"} placeholder='Password'
            onChange={(e)=>setPassword(e.target.value)}
            />
            <img src={EYE_IMG} alt='toggleview'
            onClick={()=>setTogglePass(!togglePass)}
            />
          </div>
          <div className={styles.input__error}> {error.passwordError}</div>

          {isRegistration && (<div className={styles.input__container}>
          <img src={LOCK_IMG} alt='confirm-password'/>
          <input type={toggleConfirmPass ? "text":"password"}
          placeholder='Confirm Password'
          onChange={(e)=>setConfirmPassword(e.target.value)}
          />
          <img src={EYE_IMG} alt='toggleview'
          onClick={()=>setToggleConfirmPass(!toggleConfirmPass)}
          />
          </div>)}
          {isRegistration && (<div className={styles.input__error}> {error.confirmPasswordError}</div>)}

        {isRegistration ? 
        <button 
        className={styles.submit__button}
        onClick={handleRegistration}
        >
         Register </button> :
         <button className={styles.submit__button}>
         Login
       </button>
        }
        </form>
      </div>
      <span className={styles.bottom__heading}>
        {isRegistration ? "Have an account ?" : "Have no account yet?"}
        </span>
        <button className={styles.toggle__button} onClick={()=>setIsRegistration(!isRegistration)}>
          {isRegistration ? "Log in" : "Register"}
        </button>
    </div>
  )
}

export default AuthForm