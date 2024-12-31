import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchCards, updateCardName} from "store/slices/cardsSlice.ts";
import CardCard from "components/CardCard/CardCard.tsx";
import Bin from "components/Bin/Bin.tsx";

const CardsListPage = () => {

    const dispatch = useAppDispatch()

    const {cards, card_name} = useAppSelector((state) => state.cards)

    const {is_authenticated} = useAppSelector((state) => state.user)

    const {draft_collection_id, cards_count} = useAppSelector((state) => state.collections)

    const hasDraft = draft_collection_id != null

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCardName(e.target.value))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchCards())
    }

    useEffect(() => {
        dispatch(fetchCards())
    }, [])

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
                {is_authenticated &&
                    <Col className="d-flex flex-row justify-content-end" md="6">
                        <Bin isActive={hasDraft} draft_collection_id={draft_collection_id} cards_count={cards_count} />
                    </Col>
                }
            </Row>
            <Row className="mt-5 d-flex">
                {cards?.map(card => (
                    <Col key={card.id} className="mb-5 d-flex justify-content-center" sm="12" md="6" lg="4">
                        <CardCard card={card} showAddBtn={is_authenticated} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CardsListPage