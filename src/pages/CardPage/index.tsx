import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {T_Card} from "src/modules/types.ts";
import {Col, Container, Row} from "reactstrap";
import {CardMocks} from "src/modules/mocks.ts";
import mockImage from "assets/mock.png";

type Props = {
    selectedCard: T_Card | null,
    setSelectedCard: React.Dispatch<React.SetStateAction<T_Card | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const CardPage = ({selectedCard, setSelectedCard, isMock, setIsMock}: Props) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/word_card/${id}`)
            const data = await response.json()
            setSelectedCard(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedCard(CardMocks.find(card => card?.pk == parseInt(id as string)) as T_Card)
    }

    useEffect(() => {
        if (!isMock) {
            fetchData()
        } else {
            createMock()
        }

        return () => setSelectedCard(null)
    }, []);

    if (!selectedCard) {
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
                        style={{ borderRadius: '10px', height: '400px', width: '400px', marginLeft: '60px'}}
                        alt=""
                        src={isMock ? mockImage as string : selectedCard.word_image}
                        // className="w-100"
                    />
                </Col>
                <Col md="6" style = {{marginLeft:'-150px'}}>
                    <h1 className="mb-3">{selectedCard.word}</h1>
                    <p className="fs-5">({selectedCard.word_language})</p>
                    <p className="fs-5">Описание: {selectedCard.word_description}</p>
                    <p className="fs-5">Синонимы: {selectedCard.word_synonyms}</p>
                    <p className="fs-5">Перевод: {selectedCard.word_translation}</p>
                    <p className="fs-5">Пример: {selectedCard.word_example}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default CardPage