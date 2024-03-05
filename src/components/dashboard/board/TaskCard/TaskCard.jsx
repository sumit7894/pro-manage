import React, { useState } from "react";
import styles from "./taskcard.module.css";
import axios from "axios";
import {
  BASE_URL,
  compareDate,
  findColor,
  getFormattedDate,
} from "../../../../utils/constants/constant";
import useTaskContext from "../../../../hooks/useTaskContext";
import ARROW_DOWN_IMG from "../../../../utils/assests/arrow-down.png";
import ARROW_UP_IMG from "../../../../utils/assests/arrow-up.png";
import toast, { Toaster } from "react-hot-toast";
const TaskCard = ({ card, task, isExpanded, onToggle }) => {
  const [showDropDown, setDropDown] = useState(false);
  const allCategories = ["BACKLOG", "TO-DO", "PROGRESS", "DONE"];

  const dueDateStatus = compareDate(card?.dueDate);

  const formattedDueDate = getFormattedDate(card?.dueDate);

  const {
    setEditTask,
    setTaskTitle,
    setSelectedPriority,
    setChecklists,
    setCountCompletedTask,
    setDueDate,
    setShowDeleteTask,
    setTaskId,
  } = useTaskContext();
  const priorityColor = findColor(card?.priority);
  const maxTitleChar = 25;
  const title = card?.title;
  const count = card?.countCompletedTask;
  const totalChecklist = card?.checklists?.length;

  const isOverMax = title?.length > maxTitleChar;
  const truncatedTitle = isOverMax
    ? title.slice(0, maxTitleChar) + "..."
    : title;

  const filteredCategories = allCategories.filter(
    (cat) => cat !== card?.category
  );
  const handleDelete = () => {
    setShowDeleteTask(true);
    setDropDown(false);
    setTaskId(card._id);
  };

  const handleShare = () => {
    const textToCopy = `https://pro-manage-delta.vercel.app/dashboard/task/${card._id}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.success("Link copied");
    });
    setDropDown(false);
  };

  const handleEdit = () => {
    setTaskId(card._id);
    setEditTask(true);
    const title = card?.title;
    const count = card?.countCompletedTask;
    setTaskTitle(title);
    setSelectedPriority(card.priority);
    setChecklists(card.checklists);
    setCountCompletedTask(count);
    setDueDate(card.dueDate);
    setDropDown(false);
  };
  const handleMoveTask = async (category, taskId) => {
    try {
      const data = { taskId, category };
      const response = await axios.patch(
        `${BASE_URL}/user/category/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.card__container}>
      <Toaster />
      <div className={styles.card__header}>
        <div className={styles.priority__container}>
          <div className={styles.color__container}>
            <div
              className={styles.priority__color}
              style={{ backgroundColor: priorityColor }}
            />
            {card.priority} Priority
          </div>
          <div
            className={styles.card__dropdown}
            onClick={() => setDropDown((prev) => !prev)}
          >
            ...
          </div>
        </div>
        {/*----------------- Dropdown menu to for edit delete share ------------------*/}
        {showDropDown && (
          <div className={styles.card__dropdown__menu}>
            <div onClick={handleEdit} className={styles.edit__button}>
              Edit
            </div>
            <div className={styles.share__button} onClick={handleShare}>
              Share
            </div>
            <div className={styles.delete__button} onClick={handleDelete}>
              Delete
            </div>
          </div>
        )}
      </div>
      <h2 className={styles.card__title} title={title}>
        {truncatedTitle}
      </h2>
      <div className={styles.checklist__container}>
        Checklist ({count}/{totalChecklist})
        <div className={styles.toggle__button} onClick={onToggle}>
          {isExpanded ? (
            <img src={ARROW_UP_IMG} alt="arrow-up" />
          ) : (
            <img src={ARROW_DOWN_IMG} alt="arrow-down" />
          )}
        </div>
      </div>
      {/*-------------------- All the checklists with toggle feature ---------------------*/}
      {isExpanded &&
        card?.checklists?.map((item, index) => (
          <div className={styles.card__checklist} key={item._id}>
            <input
              type="checkbox"
              className={styles.checklist__checkbox}
              checked={item?.checked}
            />
            <div className={styles.checklist__text}>{item.text}</div>
          </div>
        ))}
      <div className={styles.card__footer}>
        {card?.dueDate ? (
          <>
            {card?.category !== "DONE" ? (
              <div
                className={styles.card__date}
                style={{
                  backgroundColor: dueDateStatus ? "#DBDBDB" : "#CF3636",
                  color: dueDateStatus ? "#5A5A5A" : "#FFFFFF",
                }}
              >
                {formattedDueDate}
              </div>
            ) : (
              <div
                className={styles.card__date}
                style={{
                  backgroundColor: "#63C05B",
                  color: "white",
                }}
              >
                {formattedDueDate}
              </div>
            )}
          </>
        ) : (
          <div className={styles.empty__box}></div>
        )}
        {/*---------------- Buttons to move the card in different category --------------------*/}
        <div className={styles.card__footer__controls}>
          {filteredCategories.map((cat) => (
            <div
              className={styles.category__button}
              onClick={() => handleMoveTask(cat, card._id)}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
