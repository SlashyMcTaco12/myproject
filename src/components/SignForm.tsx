import { FunctionComponent, useEffect, useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface SignFormProps {
    setIsLoggedIn: Function;
    setIsBusiness: Function;
}

const SignForm: FunctionComponent<SignFormProps> = ({ setIsLoggedIn, setIsBusiness }) => {
    let [isSignUp, setIsSignUp] = useState<boolean>(true)

    useEffect(() => {}, [isSignUp])

    return <>
    <div className="container col-md-3 pt-3 bg-dark">
        <div className="d-flex justify-content-evenly mb-2">
            <div className="radio">
                <input
                    className="btn-check"
                    type="radio"
                    value="Personal"
                    id="form1"
                    name="form"
                    autoComplete="off"
                    defaultChecked
                    onClick={() => setIsSignUp(true)}
                />
                <label htmlFor="form1" className="btn btn-outline-success">
                    SIGN UP
                </label>
            </div>
            <div className="radio">
                <input
                    className="btn-check"
                    type="radio"
                    value="SIGN IN"
                    id="form2"
                    name="form"
                    autoComplete="off"
                    onClick={() => setIsSignUp(false)}
                />
                <label htmlFor="form2" className="btn btn-outline-success">
                    SIGN IN
                </label>
            </div>
        </div>
        {isSignUp ? (
            <SignUp />
        ) : (
            <SignIn setIsLoggedIn={setIsLoggedIn} setIsBusiness={setIsBusiness}/>
        )}
    </div>
    </>
}

export default SignForm;