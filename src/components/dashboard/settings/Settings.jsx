import React, { useState } from "react";
import styles from "./settings.module.css";
import USER_IMG from '../../../utils/assests/user_icon.png'
import EYE_IMG from '../../../utils/assests/eye.png'
import LOCK_IMG from '../../../utils/assests/lock.png'
import { checkName, checkPassword } from "../../../utils/validation/validate";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants/constant";
import toast,{ Toaster } from "react-hot-toast";
const Settings = () => {
    const [name,setName] = useState();
    const [oldPassword,setOldPassword] = useState();
    const [newPassword,setNewPassword] = useState();
    const [toggleOldPass, setToggleOldPass] = useState(false);
    const [toggleNewPass, setToggleNewPass] = useState(false);
    const [error,setError] = useState({
        nameError:"",
        oldPassError:"",
        newPassError:""
    })

    const handleUpdate =async()=>{
    const newError ={};
    newError.nameError = checkName(name);
    newError.oldPassError = checkPassword(oldPassword);
    newError.newPassError = checkPassword(newPassword);
    setError(newError);
    console.log(error);
    if(newError.nameError ==="" && newError.newPassError ==="" && newError.oldPassError ===""){
        const email = localStorage.getItem("email");
        const data ={name,email,oldPassword,newPassword}
        try {
            const response = await axios.patch(`${BASE_URL}/user/update`,data,{
              headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }
            });
            toast.success(response.data.message);
            localStorage.setItem('name', response?.data?.data?.name);
            setName("");
            setOldPassword("");
            setNewPassword("");
        } catch (error) {
            if(error.response.status === 401)
            {
                toast.error(error?.response?.data?.message);
            }
            else{
                toast.error("Somthing went wrong");
                console.log(error);
            }
        }
    }
    }
  return (
    <div className={styles.main__settings}>
      <div className={styles.settings__form__container}>
      <div className={styles.form__heading}>Settings</div>

        <form onSubmit={(e)=>e.preventDefault()}>
        <div className={styles.input__container}>
          <img src={USER_IMG} alt="name" />
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className={styles.input__error}> {error.nameError}</div>
        
        <div className={styles.input__container}>
            <img src={LOCK_IMG} alt="password" />
            <input
              type={toggleOldPass ? "text" : "password"}
              placeholder="Old Password"
              onChange={(e) => setOldPassword(e.target.value)}
              value={oldPassword}
            />
            <img
              src={EYE_IMG}
              alt="toggleview"
              onClick={() => setToggleOldPass(!toggleOldPass)}
            />
          </div>
          <div className={styles.input__error}>{error.oldPassError}</div>

          <div className={styles.input__container}>
            <img src={LOCK_IMG} alt="password" />
            <input
              type={toggleNewPass ? "text" : "password"}
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
            <img
              src={EYE_IMG}
              alt="toggleview"
              onClick={() => setToggleNewPass(!toggleNewPass)}
            />
          </div>
          <div className={styles.input__error}> {error.newPassError}</div>
          <button
              className={styles.submit__button}
              onClick={handleUpdate}
            >
              Update
            </button>
        </form>
      </div>
      <Toaster/>
    </div>
  );
};

export default Settings;
