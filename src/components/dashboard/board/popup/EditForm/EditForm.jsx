import React, { useState, useRef, useEffect } from "react";
import useTaskContext from "../../../../../hooks/useTaskContext";
import axios from "axios";
import { BASE_URL } from "../../../../../utils/constants/constant";
import ReactDatePicker from "react-datepicker";
import styles from "./editform.module.css";
import DELETE_IMG from "../../../../../utils/assests/delete.png";
import toast, { Toaster } from "react-hot-toast";
function EditForm() {
  const {
    taskTitle,
    setTaskTitle,
    selectedPriority,
    setSelectedPriority,
    checklists,
    setChecklists,
    checklistInputRef,
    countCompletedTask,
    setCountCompletedTask,
    dueDate,
    setDueDate,
    task,
    setTask,
    setEditTask,
    taskId,
  } = useTaskContext();

  useEffect(() => {}, [setTask]);
  const handleCancel = () => {
    setEditTask(false);
    setTaskTitle("");
    setSelectedPriority("");
    setChecklists([]);
    setCountCompletedTask(0);
    setDueDate("");
  };
  const handleTaskTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleAddChecklist = () => {
    setChecklists([...checklists, { text: "" }]);
  };

  const handleChecklistInputChange = (index, e) => {
    const updatedChecklists = [...checklists];
    updatedChecklists[index].text = e.target.value;
    setChecklists(updatedChecklists);
  };

  const handleChecklistDelete = (index) => {
    const updatedChecklists = [...checklists];
    updatedChecklists.splice(index, 1);
    setChecklists(updatedChecklists);
    if (checklists[index].checked) {
      setCountCompletedTask((prev) => prev - 1);
    }
  };

  const handleEditTask = async () => {
    if (!(selectedPriority && taskTitle)) {
      toast.error("Please enter all necessary fields!");
      return;
    }
    if (!checklists.length) {
      toast.error("Please create atleast 1 checklist!");
      return;
    }
    let flag = false;
    checklists.forEach((item) => {
      if (!item?.text) {
        toast.error("Please fill in all checklists");
        flag = true;
      }
    });
    if (flag) {
      return;
    }
    const _id = taskId;
    const data = {
      _id,
      taskTitle,
      selectedPriority,
      checklists,
      countCompletedTask,
      dueDate,
    };
    setTask((prevState) => [...prevState, data]);
    try {
      const response = await axios.patch(`${BASE_URL}/user/task/edit`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response?.data?.success === true) {
        toast.success("Task updated successfully");
      } else {
        toast("Somthing went wrong. Please try again!");
      }
      setEditTask(false);
    } catch (error) {
      toast.error("Somthing went wrong");
      console.log(error);
    }

    setTaskTitle("");
    setSelectedPriority("");
    setChecklists([]);
    setCountCompletedTask(0);
    setDueDate("");
  };

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Enter" &&
        checklistInputRef.current &&
        checklistInputRef.current.focus()
      ) {
        handleAddChecklist();
      }
    });

    return () => {
      document.removeEventListener("keydown", handleAddChecklist);
    };
  }, []);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Toaster />
      <div className={styles.title__input__container}>
        <label>
          Title <span className={styles.star}> *</span>
        </label>
        <input
          type="text"
          id="taskTitle"
          value={taskTitle}
          className={styles.title__inputbox}
          onChange={handleTaskTitleChange}
          placeholder="Enter Task Title"
          required
        />
      </div>
      <div className={styles.priority__container}>
        <label>
          Select Priority<span className={styles.star}> *</span>
        </label>
        <button
          type="button"
          onClick={() => setSelectedPriority("High")}
          style={{
            backgroundColor: selectedPriority === "High" ? "#EEECEC" : "white",
          }}
        >
          HIGH PRIORITY
        </button>
        <button
          type="button"
          onClick={() => setSelectedPriority("Moderate")}
          style={{
            backgroundColor:
              selectedPriority === "Moderate" ? "#EEECEC" : "white",
          }}
        >
          MODERATE PRIORITY
        </button>
        <button
          type="button"
          onClick={() => setSelectedPriority("Low")}
          style={{
            backgroundColor: selectedPriority === "Low" ? "#EEECEC" : "white",
          }}
        >
          LOW PRIORITY
        </button>
      </div>
      <div className={styles.checklist__status}>
        Checklist ({countCompletedTask}/{checklists.length})
        <span className={styles.star}> *</span>
      </div>
      <div className={styles.checklist__container}>
        {checklists.map((item, index) => (
          <div key={index} className={styles.checklist__item}>
            <input
              className={styles.checklist__checkbox}
              type="checkbox"
              checked={item.checked || false}
              onChange={() => {
                if (!item.checked) {
                  setCountCompletedTask((prev) => prev + 1);
                } else {
                  setCountCompletedTask((prev) => prev - 1);
                }
                const updatedChecklists = [...checklists];
                updatedChecklists[index].checked =
                  !updatedChecklists[index].checked;
                setChecklists(updatedChecklists);
              }}
            />
            <input
              type="text"
              className={styles.checklist__inputbox}
              value={item.text}
              placeholder="Add a task"
              onChange={(e) => handleChecklistInputChange(index, e)}
            />
            <img
              src={DELETE_IMG}
              onClick={() => handleChecklistDelete(index)}
              alt="delete"
            />
          </div>
        ))}
      </div>
      <div>
        <button
          type="button"
          onClick={handleAddChecklist}
          className={styles.add__task__button}
        >
          <span>+</span> Add New
        </button>
      </div>
      <div className={styles.form__footer}>
        <ReactDatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          placeholderText="Select Due Date"
          dateFormat="MM/dd/yyyy"
          className={styles.date__input}
        />
        <div className={styles.footer__controller}>
          <button className={styles.cancel__button} onClick={handleCancel}>
            Cancel
          </button>
          <button className={styles.submit__button} onClick={handleEditTask}>
            Update
          </button>
        </div>
      </div>
    </form>
  );
}
export default EditForm;
