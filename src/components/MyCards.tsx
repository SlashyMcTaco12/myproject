import { useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { Alert, Button, Card, Modal } from "react-bootstrap";
import busCard from "../interfaces/busCard";
import { deleteCard, getCards, updateCard } from "../services/cardServices";

import { confirmMsg, errorMsg, successMsg } from "../services/feedback";
import { getUserProfile } from "../services/userServices";
import { getCollectionById } from "../services/collectionServices";
import UpdateCard from "./UpdateCard";

interface MyCardsProps {

}

const MyCards: FunctionComponent<MyCardsProps> = () => {
    

    let [cardById, setCardById] = useState<busCard>()
    let [updated, setUpdated] = useState<boolean>(false)
    let [cards, setCards] = useState<busCard[]>([])

    useEffect(() => {
        getUserProfile()
        .then((res1) => {
            getCollectionById(res1.data._id as string)
            .then((res2) => {
                setCards(res2.data.cards)
            })
        })
    }, [updated])

    function handleDelete(_id: string, name: string){
        confirmMsg(<div className="text-warning">Are you sure you want to delete card {name}? {<br/>} <Button className="btn-sm btn-danger text-dark" onClick={() => {
            deleteCard(_id)
            .then(() => setUpdated(!updated))
        }}>DELETE</Button></div>)
    }

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return <>
        <div className="container d-flex flex-wrap">
            {<>
                {cards.length ? (
                    cards.map((card: busCard) => (
                        <Card key={card._id} className="bg-dark border border-success text-light mx-3 my-3" style={{ width: '18rem', alignItems: 'center', textAlign: 'center' }}>
                            <Card.Img variant="top" style={{ width: '10rem' }} src={card.image} />
                            <Card.Body>
                                <Card.Title>Name: {card.name}</Card.Title>
                                <Card.Text>
                                    <div>{card.description}</div>
                                    <div>Address: {card.address}</div>
                                    <div>Phone: {card.phone}</div>
                                    <div><i className="fa-regular fa-pen-to-square mx-3" style={{ cursor: "pointer" }} onClick={() => {
                                        handleShow()
                                        setCardById(card)
                                    }}
                                    ></i><i className="fa-regular fa-trash-can mx-3" style={{ cursor: "pointer" }} onClick={() => handleDelete(card._id as string, card.name)}></i></div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <h1 className="display-1 text-light mx-auto">No cards found!</h1>
                )}
            </>}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="bg-dark border border-success text-success" closeButton>
                    <Modal.Title>Update Card</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark border border-success">
                    <UpdateCard 
                        card={cardById as any}
                        updated={updated}
                        setUpdated={setUpdated}
                        handleClose={handleClose}
                    />
                </Modal.Body>
                <Modal.Footer className="bg-dark border border-success">
                    <Button variant="secondary" onClick={() => {
                            handleClose()
                        }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </>
}

export default MyCards;