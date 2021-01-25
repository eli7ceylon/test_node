import React, { Component } from "react";
import { connect } from "react-redux";
import Summary from "./Summary";
import {Container, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Products from "./Products";
// import util from "../util";
class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cartItems : [],
            totalPrice : 0,
            productsQuantity: 0
        }
    }


    getProducts = async () => {
        const response = await fetch('/api/products');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    componentDidMount() {
        let cartItems = [];
        if(localStorage.getItem("cartItems"))
        {
         cartItems =         JSON.parse(localStorage.getItem("cartItems"));
        }

       else {
            this.getProducts()
                .then(res =>
                {
                    this.setState({ cartItems: res.products })
                })

                .catch(err => console.log(err));
        }

    }


    render() {
        return  <Container>
            <h1>Shopping Cart Application</h1>
            <hr />
            <Row>
                <Col sm={4}>
                    <Summary totalPrice={this.state.totalPrice} productsQuantity={this.state.productsQuantity} />
                </Col>
                {
                    this.state.cartItems &&  <Col sm={8}>
                        <hr />
                        <Products products={this.state.cartItems}/>
                    </Col>

                }

            </Row>
        </Container>
    }

}

export default MainPage;