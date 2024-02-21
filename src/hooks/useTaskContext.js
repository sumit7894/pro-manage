import { useContext } from "react";
import TaskContext from "../context/TaskContext";

const  useTaskContext= () => {
  return useContext(TaskContext);
};
export default useTaskContext;
