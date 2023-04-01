import { FunctionComponent, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import busCard from "../interfaces/busCard";
import { getCards } from "../services/cardServices";

interface AllCardsProps {

}

const AllCards: FunctionComponent<AllCardsProps> = () => {
    let [cards, setCards] = useState<busCard[]>([])

    useEffect(() => {
        getCards()
            .then((res) => setCards(res.data))
            .catch((err) => console.log(err))
    }, [])

    return <>
        <div className="container d-flex flex-wrap">
            {<>
                {cards.length ? (
                    cards.map((card: busCard) => (
                        <Card className="bg-dark border border-success text-light mx-3 my-3" style={{ width: '18rem', alignItems: 'center', textAlign: 'center' }}>
                            <Card.Img variant="top" style={{ width: '10rem' }} src={card.image} />
                            <Card.Body>
                                <Card.Title>Name: {card.name}</Card.Title>
                                <Card.Text>
                                    <div>{card.description}</div>
                                    <div>Address: {card.address}</div>
                                    <div>Phone: {card.phone}</div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <h1 className="display-1 text-light mx-auto">No cards found!</h1>
                )}
            </>}
        </div>
    </>
}

export default AllCards;