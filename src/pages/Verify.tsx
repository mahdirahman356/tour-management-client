import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const Verify = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const [email] = useState(location.state)
     
    useEffect(() => {
    if(!email){
        navigate("/")
    }
    }, [email])

    return (
        <div>
            Verify page
        </div>
    );
};

export default Verify;