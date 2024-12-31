import {Badge, Button, Card, CardBody, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch} from "store/store.ts";
import {T_Card} from "modules/types.ts";
import {addCardToCollection, fetchCards} from "store/slices/cardsSlice.ts";
import {fetchDraftCollection, removeCardFromDraftCollection, updateCardOrder} from "store/slices/collectionsSlice.ts";

type Props = {
    card: T_Card,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    editMM?: boolean,
}

const CardCard = ({card,  showAddBtn=false, showRemoveBtn=false, editMM=false}:Props) => {

    const dispatch = useAppDispatch()

    const location = useLocation()

    const isCollectionPage = location.pathname.includes("collections")

    const handeAddToDraftCollection = async () => {
        await dispatch(addCardToCollection(card.id))
        await dispatch(fetchCards())
    }

    const handleRemoveFromDraftCollection = async () => {
        await dispatch(removeCardFromDraftCollection(card.id))
    }

    const handleShuffleCards = async () =>{
        await dispatch(updateCardOrder(card.id))
        await dispatch(fetchDraftCollection())
    }

    if (isCollectionPage) {
        return (
            <Card key={card.id}>
                <Row>
                    <Col>
                        <img
                            alt=""
                            src={card.image}
                            style={{"width": "150px"}}
                        />
                    </Col>
                    <Col md={8}>
                        <CardBody>
                            <CardTitle tag="h5">
                                {card.name}
                            </CardTitle>
                            <CardText>
                                Язык: {card.word_language}
                            </CardText>
                            <Col className="d-flex gap-5">
                                <Link to={`/cards/${card.id}`}>
                                    <Button color="primary" type="button">
                                        Открыть
                                    </Button>
                                </Link>
                                {editMM &&
                                    <Button color="primary" type="button" onClick={handleShuffleCards}>
                                        Вниз
                                    </Button>
                                }
                                {showRemoveBtn &&
                                    <Button color="danger" onClick={handleRemoveFromDraftCollection}>
                                        Удалить
                                    </Button>
                                }
                            </Col>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <Card key={card.id} style={{width: '18rem' }}>
            <img
                alt=""
                src={card.image}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {card.name}
                    <Badge className="card-badge">
                        {card.level}
                    </Badge>
                </CardTitle>
                <CardText>
                    Язык: {card.word_language} 
                </CardText>
                <Col className="d-flex justify-content-between">
                    <Link to={`/cards/${card.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {showAddBtn &&
                        <Button color="secondary" onClick={handeAddToDraftCollection}>
                            Добавить
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};

export default CardCard