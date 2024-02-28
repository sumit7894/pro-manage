import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth/Auth';
import Dashboard from './pages/dashboard/Dashboard';
import { Provider } from './context/TaskContext';
import TaskDetails from './pages/shared/TaskDetails';
import NotFound from './pages/notfound/NotFound';

function App() {
  const appRouter = createBrowserRouter([
    {
      path:'/',
      element:<Auth/>
    },
    {
      path:'dashboard',
      element:<Dashboard/>
    },
    {
      path:'/dashboard/task/:taskId',
      element:<TaskDetails/>
    },
    {
      path:'notfound',
      element:<NotFound/>
    }
  ])
  return (
    <div className="App">
      <Provider>
      <RouterProvider router={appRouter}/>
      </Provider>
    </div>
  );
}

export default App;
