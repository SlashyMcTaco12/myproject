import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedback";

interface NavbarProps {
    isLoggedIn: boolean;
    setIsLoggedIn: Function;
    isBusiness: boolean;
    setIsBusiness: Function;
}

const Navbar: FunctionComponent<NavbarProps> = ({ isLoggedIn, setIsLoggedIn, isBusiness, setIsBusiness }) => {
    let navigate = useNavigate()

    return <>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark mb-3 border-bottom border-success">
            <div className="container-fluid">
                <div>
                    <Link className="navbar-brand" to={"/"}><img src="/images/busExcLOGO.png" style={{ height: 75, borderRadius: 100 }} /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse text-light" id="navbarNavDropdown">
                    <div className="navbar-nav">
                        {isLoggedIn ? <>
                            {isBusiness ? <>
                                <Link className="nav-link fs-4" to={"/addcard"}>New Card</Link>
                                <Link className="nav-link fs-4" to={"/mycards"}>My Cards</Link>
                                <Link className="nav-link fs-4" to={"/allcards"}>All Cards</Link>
                            </> : <>
                                <Link className="nav-link disabled fs-4" to={"/addcard"}>New Card</Link>
                                <Link className="nav-link disabled fs-4" to={"/mycards"}>My Cards</Link>
                                <Link className="nav-link fs-4" to={"/allcards"}>All Cards</Link>
                            </>}
                        </> : <>
                            <Link className="nav-link fs-4" to={"/"}>Home</Link>
                            <Link className="nav-link fs-4" to={"/about"}>About</Link>
                        </>}
                    </div>
                </div>
                {isLoggedIn ? <button className="btn btn-danger btn-lg" onClick={() => (
                    setIsLoggedIn(false),
                    setIsBusiness(false),
                    localStorage.setItem('userData', 
                    JSON.stringify({
                        isBusiness: false,
                        isLoggedIn: false
                    })),
                    successMsg('Succesfully logged out!'),
                    navigate('/')
                )}>Logout</button> : <></>}
            </div>
        </nav>
    </>
}

export default Navbar;