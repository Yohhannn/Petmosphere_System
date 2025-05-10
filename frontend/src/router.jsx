import React from 'react';
import {createBrowserRouter} from 'react-router-dom';

import NotFound from './views/error/NotFound';

import Landing from './views/landing/landing';
import AboutUs from './views/landing/about';
import ContactUs from './views/landing/contact';
import Team from './views/landing/team';
import TestComponent from './views/landing/test';

import Login from './views/auth/login';
import SignUp from './views/auth/signup';

import Home from './views/main/home';
import Pets from './views/main/pets';
import PostPet from './views/main/post_pet';
import PetDetails from './views/main/pet_details';
import AccountInfo from './views/main/account';
import Alt_AboutUs from './views/main/alt_about';
import InboxPage from './views/main/inbox';

import AdminDashboard from './views/admin/admin_dashboard';
import AdminUsers from './views/admin/admin_users';
import AdminPosts from './views/admin/admin_posts';
import AdminControls from './views/admin/admin_controls';
import AdminInfo from './views/admin/admin_info';
import Validation from './views/main/validation';
import PromptPostSuccess from './prompt/prompt_post_success';

const router = createBrowserRouter ([

    {path: '*', element: <NotFound />,},
    {path: '/', element: <Landing />,},
    {path: '/login', element: <Login />,},
    {path: '/signup', element: <SignUp />,},
    {path: '/test', element: <TestComponent />,}, //Test if tailwind works lol
    
    {path: '/about', element: <AboutUs />,},
    {path: '/contact', element: <ContactUs />,},
    {path: '/team', element: <Team />,},

    {
        path: '/', element: <Validation />,
        children: [
            {path: '/home', element: <Home />,},
            {path: '/pets', element: <Pets />,},
            {path: '/post_pet', element: <PostPet />,},
            { path: '/pet/:petId/details', element: <PetDetails /> },
            {path: '/account/:accId', element: <AccountInfo />,},
            {path: '/inbox/:accId', element: <InboxPage />,},
            {path: '/alt_about', element: <Alt_AboutUs />,},
            {path: '/success', element: <PromptPostSuccess />,},
        ]
    },
    

    {path: '/admin/dashboard', element: <AdminDashboard />,},
    {path: '/admin/users', element: <AdminUsers />,},
    {path: '/admin/posts', element: <AdminPosts />,},
    {path: '/admin/info', element: <AdminInfo />,},
    {path: '/admin/controls', element: <AdminControls />,},



    // Kamo lay in ani pang Token -VVVV
    // {
    //     path: '/',
    //     element: <DefaultLayout />,
    //     children: [
    //         {
    //             path: '/users',
    //             element: <Users />,
    //         },
    //     ]
    // },

    // {
    //     path: '/',
    //     element: <GuestLayout />,
    //     children: [
    //         {
    //             path: '/Login',
    //             element: <Login />,
    //         },
    //         {
    //             path: '/register',
    //             element: <Register />,
    //         }
    //     ]
    // },

]);

export default router;
