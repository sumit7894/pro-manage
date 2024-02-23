import React, { useEffect, useState } from 'react'
import styles from './board.module.css'
import Backlog from './backlog/Backlog';
import Todo from './todo/Todo';
import InProgress from './inprogress/InProgress';
import Done from './done/Done';
const Board = () => {
  const name = localStorage.getItem('name');

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