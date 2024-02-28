import React, { useEffect, useState } from 'react'
import styles from './board.module.css'
import Backlog from './backlog/Backlog';
import Todo from './todo/Todo';
import InProgress from './inprogress/InProgress';
import Done from './done/Done';
import useTaskContext from '../../../hooks/useTaskContext';
import axios from 'axios';
import { BASE_URL } from '../../../utils/constants/constant';
import { format } from 'date-fns';
import ARROW_DOWN from '../../../utils/assests/arrow-down.png'
const Board = () => {
  const {task,setTask,setShow} = useTaskContext();
  const [selectedOption, setSelectedOption] = useState('This Week');

  const [showDropDown,setShowDropDown] = useState(false);

  const currentDate = new Date();
  const formattedDate = format(currentDate,"do MMMM yyyy");
  const name = localStorage.getItem("name");
  useEffect(()=>{
    fetchTask();
  },[task,selectedOption])
  console.log(task);
 const handleFilter =(selectedValue)=>{
  setSelectedOption(selectedValue);
  setShowDropDown(false);
 }
  const fetchTask= async ()=>{
    try 
    {
      const userId = localStorage.getItem('userId');
    const response = await axios.get(`${BASE_URL}/user/alltask`,{
      params: {
        userId: userId,
        selectedOption:selectedOption
      }
    });
    const filteredResponse = response?.data?.data;
    setTask(filteredResponse);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={styles.board__root}>
    <div className={styles.main__board}>
        <div className={styles.board__container}>
        <div className={styles.welcome__heading}>
          Welcome! {name}
        </div>
        <div className={styles.board__date}>
          {formattedDate}
        </div>
        <div className={styles.board__header}>
          <div className={styles.board__heading}>
            Board
          </div>
          <div className={styles.board__controllers}>
          
        <div
        className={styles.selected__value}
        onClick={()=>setShowDropDown((prev)=>!prev)}
        >{selectedOption}<img src={ARROW_DOWN} alt='arrow-down'/></div>
          {showDropDown&&(<div className={styles.dropdown__menu}>
            <div
            onClick={()=>handleFilter("Today")}
            >Today</div>
            <div
            onClick={()=>handleFilter("This Week")}
            >This Week</div>
            <div
            onClick={()=>handleFilter("This Month")}
            >This Month</div>
          </div>)}
            </div>
          </div>
        </div>
    </div>
    <div className={styles.task__container}>
    <div className={styles.task__board}>
    <Backlog/>
    <Todo/>
    <InProgress/>
    <Done/>
    </div>
    </div>
    </div>
  )
}

export default Board