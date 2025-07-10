import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Newest from './pages/Newest';
import MyPosts from './pages/MyPosts';
import PostView from './pages/PostView';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, 
    children: [
      {
        path: '/',
        element: <Newest />,
      },
      {
        path: '/my-posts',
        element: <MyPosts />,
      },
       {
        path: '/post/:slug',
        element: <PostView />,
      },
    ],
  },
]);