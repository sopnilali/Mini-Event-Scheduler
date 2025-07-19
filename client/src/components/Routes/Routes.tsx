
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../Layout/MainLayout'
import ListEvent from '../Modules/Events/ListEvent'
import AddEvent from '../Modules/Events/AddEvent'
import Homepage from '../Modules/Home/Homepage'
import DetailsEvent from '../Modules/Events/DetailsEvent'

const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: '/',
                element: <Homepage/>
            },
            {
                path: '/add-event',
                element: <AddEvent/>
            },
            {
                path: '/events',
                element: <ListEvent/>
            },
            {
                path: '/events/:id',
                element: <DetailsEvent/>
            }
        ]
    }
])

export default routes

