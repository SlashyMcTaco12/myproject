import { ErrorMessage, useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import User from "../interfaces/User";
import { errorMsg, successMsg } from "../services/feedback";
import { addUser } from "../services/userServices";

interface SignUpProps {

}

const SignUp: FunctionComponent<SignUpProps> = () => {
    let [updated, setUpdated] = useState<boolean>(false)
    let formik = useFormik({
        initialValues: { firstName: "", lastName: "", email: "", password: "", type: ""},
        validationSchema: yup.object({
            firstName: yup.string().required('Required Field!').min(2, 'Name too short!'),
            lastName: yup.string().required('Required Field!').min(2, 'Name too short!'),
            email: yup.string().required('Required Field!').email('Invalid E-Mail Address!'),
            password: yup.string().required('Required Field!').matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character")
                .min(8, 'Password too short! (8-16)').max(16, 'Password too long! (8-16)')
        }),
        onSubmit: (values, {resetForm}) => {
            let newUser: User = {
                name: `${values.firstName} ${values.lastName}`,
                email: values.email,
                password: values.password,
                accType: values.type
            }
            addUser(newUser)
            .then(() => {
                successMsg('You have successfully registered!')
                resetForm()
                setUpdated(!updated)
            })
            .catch((err) => {
                errorMsg(err.response.data)
            })
        }
    })

    useEffect(() => {}, [updated])
    return <>
            <h3 className="display-3 text-light text-center">SIGN UP</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="d-flex justify-content-between">
                    <div className="form-floating secondary mb-3">
                        <input
                            type="text"
                            name="firstName"
                            id="floatingfirstName"
                            placeholder="First Name"
                            className="form-control bg-dark border-success text-light"
                            value={formik.values.firstName}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="floatinglastName" className="text-secondary">First Name</label>
                    </div>
                    
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            name="lastName"
                            id="floatinglastName"
                            placeholder="Last Name"
                            className="form-control bg-dark border-success text-light"
                            value={formik.values.lastName}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="floatinglastName" className="text-secondary">Last Name</label>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    {formik.touched.firstName && formik.errors.firstName && (<p className="text-danger">{formik.errors.firstName}</p>)}
                    {formik.touched.lastName && formik.errors.lastName && (<p className="text-danger">{formik.errors.lastName}</p>)}
                </div>
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
                <div className="d-flex justify-content-evenly mb-2">
                    <div className="radio">
                        <input
                            className="btn-check"
                            type="radio"
                            value="Personal"
                            id="type1"
                            name="type"
                            autoComplete="off"
                            onChange={formik.handleChange}
                            defaultChecked
                        />
                        <label htmlFor="type1" className="btn btn-outline-secondary">
                            Personal
                        </label>
                    </div>
                    <div className="radio">
                        <input
                            className="btn-check"
                            type="radio"
                            value="Business"
                            id="type2"
                            name="type"
                            onChange={formik.handleChange}
                            autoComplete="off"
                        />
                        <label htmlFor="type2" className="btn btn-outline-secondary">
                            Business
                        </label>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={!formik.isValid || !formik.dirty}
                    className="btn btn-success mb-3 w-100"
                    style={{height: 60}}
                    >
                    Sign Up
                </button>
            </form>

    </>
}

export default SignUp;