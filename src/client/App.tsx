import  React, { useState, useEffect } from 'react';

const App = (props: AppProps) => {
	const [greeting, setGreeting] = useState(null);

	useEffect(() => {
		(async () => {
			setGreeting('Home')
		})();
	}, []);

	return (
		<div className="min-vh-100 d-flex justify-content-center align-items-center">
			<h1 className="display-1">{greeting || 'Loading'}</h1>
		</div>
	);
};

interface AppProps {}

export default App;
