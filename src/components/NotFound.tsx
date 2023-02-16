import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";

interface NotFoundProps {
    
}

const NotFound: FunctionComponent<NotFoundProps> = () => {
    let navigate = useNavigate()
    return <>
        <div className="d-flex align-items-center justify-content-center">
            <div className="text-center bg-dark text-light p-5" style={{borderRadius: 6}}>
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Oops!</span> Page not found.</p>
                <p className="lead">
                    The page you’re looking for doesn’t exist.
                </p>
                <button onClick={() => navigate(-1)} className="btn btn-primary">Go Back</button>
            </div>
        </div>
    </>
}

export default NotFound;