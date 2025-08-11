import { Link } from "react-router";

const Unauthorized = () => {
    return (
        <div>
            <h1>You are unauthorized</h1>
            <Link to="/">Home</Link>
        </div>
    );
};

export default Unauthorized;