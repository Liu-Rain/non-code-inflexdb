import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './main.css'
import DnD from './routes/dnd.jsx'
import Root from "./routes/root";
import Dashboard from "./routes/dashboard";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "dashboard/:cookies",
    element: <Dashboard />,
  },
  {
    path: "leftsidebar/",
    element: <DnD />,
  },

]); //Router stuffs are put here


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)// delete unused <App /> because we use router istead

