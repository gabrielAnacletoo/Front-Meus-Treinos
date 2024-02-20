import { RouterProvider, createBrowserRouter } from "react-router-dom"; 
import { Start } from "../components/start/start";
import { Register } from "../components/register/register";
import { Home } from "../components/home/home";
import { EditWorkout } from "../components/editWorkout/edit";
import { Login } from "../pages/login/login";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
    path: '/start',
    element: <Start/>
    },
    {
    path: '/register',
    element: <Register />
    },
    {
    path: '/treinos',
    element: <Home />
    },
    {
    path: '/edit',
    element: <EditWorkout />
    }
])

export default function Router(){
    return(
           <RouterProvider router={router} />
    )
}