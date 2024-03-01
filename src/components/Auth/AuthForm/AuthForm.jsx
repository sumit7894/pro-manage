import React, { useState } from "react";
import styles from "./authform.module.css";
import USER_IMG from "../../../utils/assests/user_icon.png";
import EMAIL_IMG from "../../../utils/assests/mail.png";
import LOCK_IMG from "../../../utils/assests/lock.png";
import EYE_IMG from "../../../utils/assests/eye.png";
import {
  checkConfirmPassword,
  checkEmail,
  checkName,
  checkPassword,
} from "../../../utils/validation/validate";
import { BASE_URL } from "../../../utils/constants/constant";
import axios from "axios";
import toast,{ Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AuthForm = () => {
  const [isRegistration, setIsRegistration] = useState(true);
  const [togglePass, setTogglePass] = useState(false);
  const [toggleConfirmPass, setToggleConfirmPass] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });
  const navigate = useNavigate();
  const handleRegistration = async() => {
    const newError = {};
    newError.nameError = checkName(name);
    newError.emailError = checkEmail(email);
    newError.passwordError = checkPassword(password);

    newError.confirmPasswordError = checkConfirmPassword(
      password,
      confirmPassword
    );
    setError(newError);
    if(newError.nameError === "" && newError.emailError ==="" && newError.passwordError ==="" && newError.confirmPasswordError ==="")
    {
      const data = {name,email,password};
      try {
        const response = await axios.post(`${BASE_URL}/register`,data);
        toast.success("Account Created")
        setIsRegistration(false);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        console.log(error);
        if(error.response.status === 409)
        {
          toast(error.response.data.message, {
            icon: '❕',
          });
        }else
        {
          toast.error("Somthing went wrong");
          console.log(error);
        }
      }
    }
  };
  const handleLogin =async()=>{
    const data ={email,password};
    try {
      const response = await axios.post(`${BASE_URL}/login`,data);
      if(response?.status === 200)
      {
        toast.success("Login successful!")
      }
      const name = response?.data?.data?.name;
      const userId = response?.data?.data?.id;
      const token = response?.data?.data?.token;
      localStorage.setItem('email', email);
      localStorage.setItem('userId',userId);
      localStorage.setItem('token',token);
      localStorage.setItem('name', name);
      setTimeout(()=>{
        navigate('/dashboard');
      },2000)
    } catch (error) {
      console.log(error);
      if(error?.response?.status === 401){
        toast.error(error?.response?.data.message)
      }
      else{
        toast.error("Somthing went wrong");
      }
    }
  }
  return (
    <div className={styles.main__auth}>
      <span className={styles.auth__heading}>
        {isRegistration ? "Register" : "Login"}
      </span>
      <div className={styles.auth__form__container}>
        <form onSubmit={(e) => e.preventDefault()}>
          {isRegistration && (
            <div className={styles.input__container}>
              <img src={USER_IMG} alt="name" />
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          )}
          {isRegistration && (
            <div className={styles.input__error}> {error.nameError}</div>
          )}

          <div className={styles.input__container}>
            <img src={EMAIL_IMG} alt="email" />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className={styles.input__error}> {error.emailError}</div>

          <div className={styles.input__container}>
            <img src={LOCK_IMG} alt="password" />
            <input
              type={togglePass ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <img
              src={EYE_IMG}
              alt="toggleview"
              onClick={() => setTogglePass(!togglePass)}
            />
          </div>
          <div className={styles.input__error}> {error.passwordError}</div>

          {isRegistration && (
            <div className={styles.input__container}>
              <img src={LOCK_IMG} alt="confirm-password" />
              <input
                type={toggleConfirmPass ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              <img
                src={EYE_IMG}
                alt="toggleview"
                onClick={() => setToggleConfirmPass(!toggleConfirmPass)}
              />
            </div>
          )}
          {isRegistration && (
            <div className={styles.input__error}>
              {" "}
              {error.confirmPasswordError}
            </div>
          )}

          {isRegistration ? (
            <button
              className={styles.submit__button}
              onClick={handleRegistration}
            >
              Register
            </button>
          ) : (
            <button className={styles.submit__button}
            onClick={handleLogin}
            >Login</button>
          )}
        </form>
      </div>
      <span className={styles.bottom__heading}>
        {isRegistration ? "Have an account ?" : "Have no account yet?"}
      </span>
      <button
        className={styles.toggle__button}
        onClick={() => setIsRegistration(!isRegistration)}
      >
        {isRegistration ? "Log in" : "Register"}
      </button>
      <Toaster/>
    </div>
  );
};

export default AuthForm;
