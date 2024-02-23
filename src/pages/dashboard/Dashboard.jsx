import React from 'react'
import Sidebar from '../../components/dashboard/sidebar/Sidebar'
import useTaskContext from '../../hooks/useTaskContext'
import Board from '../../components/dashboard/board/Board';
import Settings from '../../components/dashboard/settings/Settings';
import Analytics from '../../components/dashboard/analytics/Analytics';
import CreateTask from '../../components/dashboard/board/popup/create/CreateTask';

const Dashboard = () => {
  const {selectedMenu,showCreateTask} = useTaskContext();
  return (
    <div style={{display:"flex",height:"100vh",width:"100vw"}}>
      <Sidebar/>
      {showCreateTask && <CreateTask/>}
      {selectedMenu ===1 && <Board/>} 
      {selectedMenu ===2 && <Analytics/>}
      {selectedMenu ===3 && <Settings/>} 
    </div>
  )
}

export default Dashboard