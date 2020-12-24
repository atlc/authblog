import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/nav/Navbar';
import { Home } from './views/Home';
import AllBlogs from './views/blogs/AllBlogs';
import SingleBlog from './views/blogs/SingleBlog';
import EditableBlog from './views/blogs/EditableBlog';
import CreateBlog from './views/blogs/CreateBlog';
import Login from './views/auth/Login';
import Logout from './views/auth/Logout';
import Register from './views/auth/Register';

const App = (props: AppProps) => {
	return (
		<BrowserRouter>
			<Navbar />
			<div className="container mt-5 pt-3">
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/blogs/create">
						<CreateBlog />
					</Route>
					<Route exact path="/blogs">
						<AllBlogs />
					</Route>
					<Route exact path="/blogs/:id/edit">
						<EditableBlog />
					</Route>
					<Route exact path="/blogs/:id">
						<SingleBlog />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/logout">
						<Logout />
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
					<Route path="*">
						<Home />
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
};

interface AppProps { }

export default App;