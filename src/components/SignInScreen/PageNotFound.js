import React from 'react';
import { Link } from "react-router-dom";
import img from "../../assets/404-error.png";
import { Container, Image } from "react-bootstrap";


const PageNotFound = () => {
    return (
        <Container className="d-flex justify-content-center vh-100" >
            <div className="d-flex justify-content-center flex-column w-50 text-center">
                <Image src={img} />
                <h2 className="text-center">PAGE NOT FOUND</h2>
                <Link to="/">Sign In Page</Link>
            </div>
        </Container>
    );
}

export default PageNotFound;