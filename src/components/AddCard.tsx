import { useFormik } from "formik";
import { stringify } from "querystring";
import { FunctionComponent, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import * as yup from 'yup';
import busCard from "../interfaces/busCard";
import { addCard } from "../services/cardServices";
import { successMsg } from "../services/feedback";

interface AddCardProps {

}

const AddCard: FunctionComponent<AddCardProps> = () => {
    let formik = useFormik({
        initialValues: { name: "", description: "", address: "", phone: "", image: "", userID: JSON.parse(localStorage.getItem('userID') as string) },
        validationSchema: yup.object({
            name: yup.string().required('Business name required.').min(2).max(20),
            description: yup.string().required('Business description required.').min(2).max(40),
            address: yup.string().required('Business address required.').min(2).max(30),
            phone: yup.string().required('Business phone required.').min(10).max(10),
            image: yup.string().required('Paste image URL here.')
        }),
        onSubmit: (values: busCard, { resetForm }) => {
            addCard(values)
            resetForm()
            successMsg('Card succesfully created!')
        }
    })

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return <>
        <div className="container col-md-3 pt-3 bg-dark">
            <h3 className="display-3 text-light text-center">Create Card</h3>
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
                        className="btn btn-success mb-3 w-100"
                        style={{ height: 60, marginRight: 5 }}
                    >
                        Create Card
                    </button>
                    <button
                        type="button"
                        disabled={!formik.isValid || !formik.dirty}
                        className="btn btn-warning mb-3 w-100"
                        style={{ height: 60 }}
                        onClick={() => handleShow()}
                    >
                        Preview
                    </button>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header className="bg-dark border border-success text-success" closeButton>
                        <Modal.Title>Card Preview</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-dark border border-success">
                        <Card className="bg-dark border border-success text-success" style={{ width: '18rem', alignItems: 'center', textAlign: 'center', margin: '0 auto' }}>
                            <Card.Img variant="top" style={{ width: '10rem' }} src={formik.values.image} />
                            <Card.Body>
                                <Card.Title>Name: {formik.values.name}</Card.Title>
                                <Card.Text>
                                    <div>{formik.values.description}</div>
                                    <div>Address: {formik.values.address}</div>
                                    <div>Phone: {formik.values.phone}</div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Modal.Body>
                    <Modal.Footer className="bg-dark border border-success">
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </form>
        </div>

    </>
}

export default AddCard;