import { Navbar } from 'react-bootstrap'
import './NavBar.css';

function NavBar({ title, render }) {
    return (
        <Navbar className="NavBar" bg="light" expand="lg">
            <Navbar.Brand id="brand" href="#home">
                {title}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {render()}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;