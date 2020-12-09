import { Navbar } from 'react-bootstrap'
// import { Form, FormControl, Button } from 'react-bootstrap';
import './NavBar.css';

function NavBar({ title, logo, render, ...props }) {
    return (
        <Navbar className="NavBar" {...props}>
            <Navbar.Brand id="brand" href="/">
                {logo ? 
                    <img 
                        alt=""
                        src={logo}
                        className="logo"
                    /> : 
                    null
                }
                {title}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form> */}
                {render()}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;