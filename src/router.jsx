import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import StudentForm from "./views/StudentForm";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/students',
                element: <Users />
            },
            {
                path: '/',
                element: <Navigate to="/students" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },       
            {
                path: '/students/new',
                element: <StudentForm key="studentCreate"/>
            },  
            {
                path: '/students/:id',
                element: <StudentForm key="studentUpdate"/>
            },  
            
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default router;