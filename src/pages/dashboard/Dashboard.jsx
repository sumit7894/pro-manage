import React from 'react'
import Sidebar from '../../components/dashboard/sidebar/Sidebar'
import useTaskContext from '../../hooks/useTaskContext'
import Board from '../../components/dashboard/board/Board';
import Settings from '../../components/dashboard/settings/Settings';
import Analytics from '../../components/dashboard/analytics/Analytics';
import CreateTask from '../../components/dashboard/board/popup/create/CreateTask';
import EditTask from '../../components/dashboard/board/popup/Edit/EditTask';
import DeleteTask from '../../components/dashboard/board/popup/delete/DeleteTask';

const Dashboard = () => {
  const {selectedMenu,showCreateTask,showEditTask,showDeleteTask} = useTaskContext();
  return (
    <div style={{display:"flex",height:"100vh",width:"100vw"}}>
      <Sidebar/>
      {showCreateTask && <CreateTask/>}
      {showEditTask && <EditTask/>}
      {showDeleteTask && <DeleteTask/>}
      {selectedMenu ===1 && <Board/>} 
      {selectedMenu ===2 && <Analytics/>}
      {selectedMenu ===3 && <Settings/>} 
    </div>
  )
}

export default Dashboard