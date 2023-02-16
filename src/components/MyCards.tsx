import { useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { Alert, Button, Card, Modal } from "react-bootstrap";
import busCard from "../interfaces/busCard";
import { deleteCard, getCards, updateCard } from "../services/cardServices";
import * as yup from 'yup';
import { confirmMsg, successMsg } from "../services/feedback";

interface MyCardsProps {

}

const MyCards: FunctionComponent<MyCardsProps> = () => {
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
            updateCard(cardID, values)
            resetForm()
            successMsg('Card succesfully updated!')
            setIsUpdated(!isUpdated)
        }
    })

    let [isUpdated, setIsUpdated] = useState<boolean>(false)
    let [cards, setCards] = useState<busCard[]>([])
    let [cardID, setCardID] = useState<number>(0)

    useEffect(() => {
        getCards()
            .then((res) => setCards(res.data))
            .catch((err) => console.log(err))
    }, [isUpdated])

    function handleDelete(id: number, name: string){
        confirmMsg(<div className="text-warning">Are you sure you want to delete card {name}? {<br/>} <Button className="btn-sm btn-danger text-dark" onClick={() => {deleteCard(id); setIsUpdated(!isUpdated)}}>DELETE</Button></div>)
    }

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return <>
        <div className="container d-flex flex-wrap">
            {<>
                {cards.map((card: busCard) => (card.userID === JSON.parse(localStorage.getItem('userID') as string) && (
                    <Card key={card.id} className="bg-dark border border-success text-light mx-3 my-3" style={{ width: '18rem', alignItems: 'center', textAlign: 'center' }}>
                        <Card.Img variant="top" style={{ width: '10rem' }} src={card.image} />
                        <Card.Body>
                            <Card.Title>Name: {card.name}</Card.Title>
                            <Card.Text>
                                <div>{card.description}</div>
                                <div>Address: {card.address}</div>
                                <div>Phone: {card.phone}</div>
                                <div><i className="fa-regular fa-pen-to-square mx-3" style={{ cursor: "pointer" }} onClick={() => {
                                    handleShow()
                                    setCardID(card.id as number)
                                }}
                                ></i><i className="fa-regular fa-trash-can mx-3" style={{ cursor: "pointer" }} onClick={() => handleDelete(card.id as number, card.name)}></i></div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )))}
            </>}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="bg-dark border border-success text-success" closeButton>
                    <Modal.Title>Update Card</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark border border-success">
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
                </Modal.Body>
                <Modal.Footer className="bg-dark border border-success">
                    <Button variant="secondary" onClick={() => {
                            handleClose()
                            formik.resetForm()
                        }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </>
}

export default MyCards;