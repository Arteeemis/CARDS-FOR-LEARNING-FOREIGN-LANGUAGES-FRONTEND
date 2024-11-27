import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {T_Card} from "src/modules/types.ts";
import CardCard from "components/CardCard";
import {CardMocks} from "src/modules/mocks.ts";
import {FormEvent, useEffect} from "react";
import * as React from "react";

type Props = {
    cards: T_Card[],
    setCards: React.Dispatch<React.SetStateAction<T_Card[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
    cardName: string,
    setCardName: React.Dispatch<React.SetStateAction<string>>
}

const CardsListPage = ({cards, setCards, isMock, setIsMock, cardName, setCardName}:Props) => {

    const fetchData = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // Set timeout to 5 seconds
        try {
            const response = await fetch(`/api/word_cards?card_name=${cardName.toLowerCase()}`, {
                signal: controller.signal // Pass the abort signal to the fetch request
            });
            clearTimeout(timeoutId); // Clear the timeout if the fetch completes in time
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCards(data.cards);
            setIsMock(false);
        } catch (error) {
            console.error('Fetch error:', error);
            createMocks(); // Call createMocks if there was an error or if the request was aborted
        }
    };
    

    const createMocks = () => {
        setIsMock(true)
        setCards(CardMocks.filter(card => card.word.toLowerCase().includes(cardName.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        if (isMock) {
            createMocks()
        } else {
            await fetchData()
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <Container>
            <Row className="mb-5" style={{ marginLeft: '45px' }}>
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md="8">
                                <Input value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row className="w-100">
                {cards?.map(card => (
                    <Col key={card.pk} xs="4" >
                        <CardCard card={card} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CardsListPage