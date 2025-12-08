import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../page/shared/Footer';
import Header from '../page/shared/NavBer';

const RootLayout = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;