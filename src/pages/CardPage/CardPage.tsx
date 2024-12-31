import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchCard, removeSelectedCard} from "store/slices/cardsSlice.ts";

const CardPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {card} = useAppSelector((state) => state.cards)

    useEffect(() => {
        dispatch(fetchCard(id))
        return () => dispatch(removeSelectedCard())
    }, []);

    if (!card) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <img
                        alt=""
                        src={card.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{card.name}</h1>
                    <p className="fs-5">Описание: {card.description}</p>
                    <p className="fs-5">Перевод: {card.translate}</p>
                    <p className="fs-5">Уровень: {card.level} </p>
                    <p className="fs-5">Язык: {card.word_language} </p>
                </Col>
            </Row>
        </Container>
    );
};

export default CardPage