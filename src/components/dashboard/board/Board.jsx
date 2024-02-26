import React, { useEffect, useState } from 'react'
import styles from './board.module.css'
import Backlog from './backlog/Backlog';
import Todo from './todo/Todo';
import InProgress from './inprogress/InProgress';
import Done from './done/Done';
import useTaskContext from '../../../hooks/useTaskContext';
import axios from 'axios';
import { BASE_URL } from '../../../utils/constants/constant';
const Board = () => {
  const name = localStorage.getItem('name');
  const {task,setTask} = useTaskContext();
  useEffect(()=>{
    fetchTask();
  },[task])
  const fetchTask= async ()=>{
    try 
    {
      const userId = localStorage.getItem('userId');
      console.log({userId});
    const response = await axios.get(`${BASE_URL}/user/alltask`,{
      params: {
        userId: userId
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
          12th Jan 2024
        </div>
        <div className={styles.board__header}>
          <div className={styles.board__heading}>
            Board
          </div>
          <div className={styles.board__controllers}>
            This week
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