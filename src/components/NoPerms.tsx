import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";

interface NoPermsProps {
    
}

const NoPerms: FunctionComponent<NoPermsProps> = () => {
    let navigate = useNavigate()
    return <>
        <div className="d-flex align-items-center justify-content-center">
            <div className="text-center p-5 bg-dark text-light" style={{borderRadius: 6}}>
                <h1 className="display-1 fw-bold">403</h1>
                <p className="fs-3"> <span className="text-danger">Oops!</span> No permission!</p>
                <p className="lead">
                    You do not have the permissions required to view this page.
                </p>
                <button onClick={() => navigate(-1)} className="btn btn-primary">Go Back</button>
            </div>
        </div>
    </>
}

export default NoPerms;