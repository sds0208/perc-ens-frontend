import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './components/MainLayout';
import List from './components/List'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <MainLayout /> }>
      <Route index element={ <List /> } />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
}

export default App
