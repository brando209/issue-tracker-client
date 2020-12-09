import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function LinkButton({ to, text, ...props }) {
    return (
        <Button as={Link} to={to ? to : "#"} variant="outline-primary" className="m-sm-1" {...props}>
            {text || props.children}
        </Button>
    );
}

export default LinkButton;