import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth/Auth';
import Dashboard from './pages/dashboard/Dashboard';

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
      <RouterProvider router={appRouter}/>
    </div>
  );
}

export default App;
