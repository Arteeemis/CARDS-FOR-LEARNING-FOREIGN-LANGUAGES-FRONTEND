import {Badge, Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import mockImage from "assets/mock.png";
import {Link} from "react-router-dom";
import {T_Card} from "modules/types.ts";

interface CardCardProps {
    card: T_Card,
    isMock: boolean
}

const CardCard = ({card, isMock}: CardCardProps) => {
    return (
        <Card key={card.pk} style={{width: '18rem', margin: "0 auto 50px" }}>
            <CardImg
                src={isMock ? mockImage as string : card.word_image}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {card.word}
                    <Badge className="card-badge">
                        {card.word_level}
                    </Badge>
                </CardTitle>
                <CardText>
                    Перевод: {card.word_translation}
                </CardText>
                <Link to={`/cards/${card.pk}`}>
                    <Button color="primary">
                        Открыть
                    </Button>
                </Link>
            </CardBody>
        </Card>
    );
};

export default CardCard