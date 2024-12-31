import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import "./styles.css"
import HomePage from "pages/HomePage/HomePage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";
import CardsListPage from "pages/CardsListPage/CardsListPage.tsx";
import CardPage from "pages/CardPage/CardPage.tsx";
import CollectionsPage from "pages/CollectionsPage/CollectionsPage.tsx";
import CollectionPage from "pages/CollectionPage/CollectionPage.tsx";
import ProfilePage from "pages/ProfilePage/ProfilePage.tsx";
import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";

function App() {
    return (
        <div>
            <Header />
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs />
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login/" element={<LoginPage />} />
                        <Route path="/register/" element={<RegisterPage />} />
                        <Route path="/cards/" element={<CardsListPage />} />
                        <Route path="/cards/:id/" element={<CardPage />} />
                        <Route path="/collections/" element={<CollectionsPage />} />
                        <Route path="/collections/:id/" element={<CollectionPage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
