import { useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import busCard from "../interfaces/busCard";
import * as yup from "yup";
import { getUserProfile } from "../services/userServices";
import { updateCard } from "../services/cardServices";
import { errorMsg, successMsg } from "../services/feedback";
import { useNavigate } from "react-router-dom";

interface UpdateProductProps {
    card: busCard,
    updated: boolean,
    setUpdated: Function,
    handleClose: Function
}

const UpdateProduct: FunctionComponent<UpdateProductProps> = ({ card,updated, setUpdated, handleClose }) => {
    let formik = useFormik({
        initialValues: { name: card.name, description: card.description, address: card.address, phone: card.phone, image: card.image, userID: card.userID },
        validationSchema: yup.object({
            name: yup.string().required('Business name required.').min(2).max(20),
            description: yup.string().required('Business description required.').min(2).max(40),
            address: yup.string().required('Business address required.').min(2).max(30),
            phone: yup.string().required('Business phone required.').min(10).max(10),
            image: yup.string().required('Paste image URL here.')
        }),
        onSubmit: (values: busCard) => {
            getUserProfile()
            .then(() => {
                updateCard((card as any)._id, values)
                .then(() => {
                    successMsg('Card succesfully updated!')
                    setUpdated(!updated)
                    handleClose()
                })
                .catch((err) => errorMsg(err.response.data))
            })
            .catch((err) => console.log(err))
        }
    })

    return <>
        <form onSubmit={formik.handleSubmit}>
                        <div className="form-floating secondary mb-3">
                            <input
                                type="text"
                                name="name"
                                id="floatingName"
                                placeholder="Name"
                                className="form-control bg-dark border-success text-light"
                                value={formik.values.name}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            <label htmlFor="floatingName" className="text-secondary">Name</label>
                        </div>
                        <div className="d-flex justify-content-between">
                            {formik.touched.name && formik.errors.name && (<p className="text-danger">{formik.errors.name}</p>)}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control bg-dark border-success text-light"
                                id="floatingDescription"
                                placeholder="Description"
                                name="description"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingDescription" className="text-secondary">Description</label>
                        </div>
                        {formik.touched.description && formik.errors.description && (<p className="text-danger">{formik.errors.description}</p>)}
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control bg-dark border-success text-light"
                                id="floatingAddress"
                                placeholder="Address"
                                name="address"
                                onChange={formik.handleChange}
                                value={formik.values.address}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingAddress" className="text-secondary">Address</label>
                        </div>
                        {formik.touched.address && formik.errors.address && (<p className="text-danger">{formik.errors.address}</p>)}
                        <div className="form-floating mb-3">
                            <input
                                type="string"
                                className="form-control bg-dark border-success text-light"
                                id="floatingPhone"
                                placeholder="Phone"
                                name="phone"
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingPhone" className="text-secondary">Phone</label>
                        </div>
                        {formik.touched.phone && formik.errors.phone && (<p className="text-danger">{formik.errors.phone}</p>)}
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control bg-dark border-success text-light"
                                id="floatingImage"
                                placeholder="Image URL"
                                name="image"
                                onChange={formik.handleChange}
                                value={formik.values.image}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="floatingImage" className="text-secondary">Image</label>
                        </div>
                        {formik.touched.image && formik.errors.image && (<p className="text-danger">{formik.errors.image}</p>)}

                        <div className="d-flex justify-content-evenly mb-2">
                            <button
                                type="submit"
                                disabled={!formik.isValid || !formik.dirty}
                                className="btn btn-success"
                            >
                                Update Card
                            </button>
                        </div>
                    </form>
    </>
}

export default UpdateProduct;