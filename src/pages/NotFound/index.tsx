import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
	return (
		<>
			<h1>Page not found!</h1>
			<Link to="/" className="btn" title="Go back">
				Go back
			</Link>
		</>
	);
};

export default NotFound;
