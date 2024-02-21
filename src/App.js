import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth/Auth';
import Dashboard from './pages/dashboard/Dashboard';
import { Provider } from './context/TaskContext';

function App() {
  const appRouter = createBrowserRouter([
    {
      path:'/',
      element:<Auth/>
    },
    {
      path:'dashboard',
      element:<Dashboard/>
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
