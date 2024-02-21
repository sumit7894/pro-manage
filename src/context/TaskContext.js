const {createContext, useState} = require('react')

const TaskContext = createContext();

const Provider = ({children})=>{
    const [isAuthenticated,setIsAuthenticated] = useState();
    const [selectedMenu,setSelectedMenu] = useState(1);
const value = 
{
selectedMenu,
setSelectedMenu,
isAuthenticated,
setIsAuthenticated,
}
return (<TaskContext.Provider value={value}>{children}</TaskContext.Provider>)
};
export {Provider};

export default TaskContext;