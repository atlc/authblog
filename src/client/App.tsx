import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Navbar from './components/nav/Navbar';
import { Home } from './views/common/Home';
import Contact from './views/common/Contact';
import AllBlogs from './views/blogs/AllBlogs';
import SingleBlog from './views/blogs/SingleBlog';
import EditableBlog from './views/blogs/EditableBlog';
import CreateBlog from './views/blogs/CreateBlog';
import Login from './views/auth/Login';
import Logout from './views/auth/Logout';
import Register from './views/auth/Register';
import DonateForm from './views/stripe/DonateForm';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_live_51HyNu4DTKPEaO2VrZEKxUQ1cvg94J3MxYonZScKOEX7psSn5iV7nfJ8dJA74fCtEngvo7a4M60S6rUz1X0e98v1X00YPxOJoCO");


const App = (props: AppProps) => {
	return (
		<HashRouter>
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
					<Route exact path="/contact">
						<Contact />
					</Route>
					<Route exact path="/donate">
						<Elements stripe={stripePromise}>
							<DonateForm />
						</Elements>
					</Route>
					<Route path="*">
						<Home />
					</Route>
				</Switch>
			</div>
		</HashRouter>
	);
};

interface AppProps { }

export default App;