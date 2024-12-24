import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import CardPage from "pages/CardPage";
import CardsListPage from "pages/CardsListPage";
import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage";
import {useState} from "react";
import {T_Card} from "modules/types.ts";

function App() {

    const [cards, setCards] = useState<T_Card[]>([])

    const [selectedCard, setSelectedCard] = useState<T_Card | null>(null)

    const [isMock, setIsMock] = useState(false);

    return (
        <>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedCard={selectedCard}/>
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/cards/" element={<CardsListPage cards={cards} setCards={setCards} isMock={isMock} setIsMock={setIsMock} />} />
                        <Route path="/cards/:id" element={<CardPage selectedCard={selectedCard} setSelectedCard={setSelectedCard} isMock={isMock} setIsMock={setIsMock} />} />
                    </Routes>
                </Row>
            </Container>
        </>
    )
}

export default App
