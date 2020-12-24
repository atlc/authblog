import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { User } from '../../utils/api-service';
import NB from './NavButton';

const isLoggedIn = (User && User.userid && User.roles.includes('user'));

const Navbar = () => {
    const location = useLocation();
    const [pathTrigger, forceRerender] = useState(location.pathname);

    useEffect(() => {
        forceRerender(location.pathname)
    }, [location]);

    return (
        <nav className="navbar mr-auto fixed-top navbar-light bg-primary">
            {pathTrigger ? <></> : <></>}
            {/* Attempting to tie history in the return to force a re-render of the component */}
            <div className="row">
                <NB path="/" text="Home" />
                <NB path="/blogs" text={`${isLoggedIn? 'View' : 'Preview'} Blogs`} />
                {isLoggedIn && <NB path="/blogs/create" text="Create a Blog" />}
                {!isLoggedIn ? 
                    <>
                        <NB path="/login" text="Login" />
                        <NB path="/register" text="Register" />
                    </>
                    : <NB path="/logout" text="Log Out" />}
                <NB path="/donate" text="Donate!" />
                <p>Current path to aimlessly hope to rerender buttons: "localhost:3000{pathTrigger}"</p>
            </div>
        </nav>
    );
};

export default Navbar;

