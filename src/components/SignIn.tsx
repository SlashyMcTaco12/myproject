import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import User from "../interfaces/User";
import { errorMsg, successMsg } from "../services/feedback";
import { checkUser } from "../services/userServices";

interface SignInProps {
    setIsLoggedIn: Function;
    setIsBusiness: Function;
}

const SignIn: FunctionComponent<SignInProps> = ({ setIsLoggedIn, setIsBusiness}) => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: yup.object({
            email: yup.string().required('Required Field!').email('Invalid E-Mail Address!'),
            password: yup.string().required('Required Field!').min(8, 'Password is too short! (8-16)').max(16, 'Password is too long! (8-16)')
        }),
        onSubmit: (values: User) => {
            checkUser(values)
            .then((res) => {
                if (res.data.length) {
                    localStorage.setItem("isLoggedIn", "true")
                    setIsLoggedIn(true)
                    localStorage.setItem("isBusiness", res.data[0].accType === 'Business' ? ('true') : ('false'))
                    localStorage.setItem("userID", res.data[0].id)
                    setIsBusiness(() => res.data[0].accType === 'Business' ? (true) : (false))
                    navigate("/")
                    successMsg("You logged in successfully!")
                }
                else errorMsg("Wrong email or password.");
            })
            .catch((err) => console.log(err)
            )
        }
    })

    return <>

            <h3 className="display-3 text-light text-center">SIGN IN</h3>
            <form onSubmit={formik.handleSubmit}>
                
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control bg-dark border-success text-light"
                        id="floatingEmail"
                        placeholder="name@example.com"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="floatingEmail" className="text-secondary">Email address</label>
                </div>
                {formik.touched.email && formik.errors.email && (<p className="text-danger">{formik.errors.email}</p>)}
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control bg-dark border-success text-light"
                        id="floatingPassword"
                        placeholder="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="floatingPassword" className="text-secondary">Password</label>
                </div>
                {formik.touched.password && formik.errors.password && (<p className="text-danger">{formik.errors.password}</p>)}
                <button
                    type="submit"
                    disabled={!formik.isValid || !formik.dirty}
                    className="btn btn-success mb-3 w-100"
                    style={{height: 60}}
                    >
                    Sign In
                </button>
            </form>

    </>
}

export default SignIn;