import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import CardCard from "components/CardCard";
import {ChangeEvent, FormEvent, useEffect} from "react";
import * as React from "react";
import {useAppSelector} from "src/store/store.ts";
import {updateCardName} from "src/store/slices/cardsSlice.ts";
import {T_Card} from "modules/types.ts";
import {CardMocks} from "modules/mocks.ts";
import {useDispatch} from "react-redux";

type Props = {
    cards: T_Card[],
    setCards: React.Dispatch<React.SetStateAction<T_Card[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const CardsListPage = ({cards, setCards, isMock, setIsMock}:Props) => {

    const dispatch = useDispatch()

    const {card_name} = useAppSelector((state) => state.cards)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCardName(e.target.value))
    }

    const createMocks = () => {
        setIsMock(true)
        setCards(CardMocks.filter(card => card.word.toLowerCase().includes(card_name.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        await fetchCards()
    }

    const fetchCards = async () => {
        try {
            const response = await fetch(`/api/word_cards?card_name=${card_name.toLowerCase()}`)
            const data = await response.json()
            setCards(data.cards)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    useEffect(() => {
        fetchCards()
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="8">
                                <Input value={card_name} onChange={handleChange} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                {cards?.map(card => (
                    <Col key={card.pk} sm="12" md="6" lg="4">
                        <CardCard card={card} isMock={isMock}/>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CardsListPage