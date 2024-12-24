import { Container, Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import {NavLink as RRNavLink} from "react-router-dom";
// import {useState} from "react";
// import {Collapse,  NavbarToggler, } from "reactstrap";

const Header = () => {

	// const [collapsed, setCollapsed] = useState(true);

	// const toggleNavbar = () => setCollapsed(!collapsed);

	// const hideMenu = () => setCollapsed(true)

    return (
		<header>
			{/* <Navbar collapseOnSelect className="p-0" expand="lg">
				<Container className="p-0">
					<Navbar collapseOnSelect expand="lg" dark>
						<NavbarBrand tag={RRNavLink} to="/">
							Карточки для изучения иностранных языков
						</NavbarBrand>
						<NavbarToggler aria-controls="responsive-navbar-nav" onClick={toggleNavbar} />
						<Collapse id="responsive-navbar-nav" navbar isOpen={!collapsed}>
							<Nav className="mr-auto fs-5 d-flex flex-grow-1 justify-content-end align-items-center" navbar>
								<NavItem>
									<NavLink tag={RRNavLink} onClick={hideMenu} to="/cards">
										Слова
									</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</Navbar>
				</Container>
			</Navbar> */}
			<Navbar className="p-3" expand="lg">
				<Container className="d-flex justify-content-between align-items-center">
						<NavbarBrand tag={RRNavLink} to="/">
							Ne-Quizlet
						</NavbarBrand>
        			<Nav>
						<NavItem style={{ fontSize: "20px"}}>
							<NavLink tag={RRNavLink} to="/cards">
								Слова
							</NavLink>
						</NavItem>
        			</Nav>
      			</Container>
    		</Navbar>
		</header>
    );
};

export default Header