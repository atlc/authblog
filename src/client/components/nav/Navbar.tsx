import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar mr-auto fixed-top navbar-light bg-primary">
            <div className="row">
                <Link className="btn bg-secondary text-white mx-2" to="/">Home</Link>
                <Link className="btn bg-secondary text-white mx-2" to="/blogs">All Blogs</Link>
                <Link className="btn bg-secondary text-white mx-2" to="/blogs/create">Create a Blog</Link>
                <Link className="btn bg-secondary text-white mx-2" to="/login">Login</Link>
                <Link className="btn bg-secondary text-white mx-2" to="/register">Register</Link>
            </div>
        </nav>
    );
};

export default Navbar;

