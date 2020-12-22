import React, { useState, useEffect } from 'react';
import { User } from '../../utils/api-service';
import NB from './NavButton';

const isLoggedIn = (User && User.userid && User.roles.includes('user'));

const Navbar = () => {
    useEffect(() => {
        // do nothing to just trigger rerender of navbar upon auth change
    }, [isLoggedIn]);

    return (
        <nav className="navbar mr-auto fixed-top navbar-light bg-primary">
            <div className="row">
                <NB path="/" text="Home" />
                <NB path="/blogs" text={isLoggedIn? "All Blogs" : "Preview Blogs"} />
                {isLoggedIn ? <NB path="/blogs/create" text="Create a Blog" /> : <></>}
                {!isLoggedIn ? 
                    <>
                        <NB path="/login" text="Login" />
                        <NB path="/register" text="Register" />
                    </>
                    : <NB path="/logout" text="Log Out" />}
            </div>
        </nav>
    );
};

export default Navbar;

