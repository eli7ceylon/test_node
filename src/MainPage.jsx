import React, { Component } from "react";
import Summary from "./components/Summary";
import {Container, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Products from "./components/Products";

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
        if (localStorage.getItem("cartItems")) {
            cartItems = JSON.parse(localStorage.getItem("cartItems"));
            this.setState({cartItems: cartItems});
            let totalPrice = cartItems.reduce((accum, product) => accum + product.quantity * product.price, 0);
            let productsQuantity = cartItems.reduce((accum, product) => accum + product.quantity, 0);
            this.setState({totalPrice, productsQuantity});
        } else {
            this.getProducts()
                .then(res => {
                    this.setState({cartItems: res.products})
                })

                .catch(err => console.log(err));
        }

    }

    saveCartItemInStorage(){
        localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
    }

    increaseQuantity(id) {

        let cartItems = [...this.state.cartItems];
        cartItems.filter(x => x.id === id).map(x => x.quantity++);

        this.setState(oldState => {
            debugger
            let product = oldState.cartItems.find(x => x.id == id)
            let newState = {...oldState};
            newState.productsQuantity++;
            newState.totalPrice = newState.totalPrice + product.price;
            newState.cartItems = [...cartItems]

            this.saveCartItemInStorage();
            return newState;
        });
    }

    decreaseQuantity(id)
    {
        let cartItems = [...this.state.cartItems];
        cartItems.filter(x => x.id === id).map( x => x.quantity > 0 ? x.quantity--  : 0);

        this.setState(oldState => {
            let product = oldState.cartItems.find(x => x.id == id);
            let newState = {...oldState};


            newState.cartItems = [...cartItems];
            newState.productsQuantity--;
            newState.totalPrice = newState.totalPrice - product.price;
            this.saveCartItemInStorage();

            return newState;
        });
       ;
    }


    deleteProduct(id)
    {
        let cartItems = [...this.state.cartItems];
        let product = cartItems.find( x => x.id == id);
        cartItems = cartItems.filter( x => { return x.id != id });

        this.setState( oldState => {
            let newState = {...oldState};
            newState.cartItems = [...cartItems];
            newState.productsQuantity = newState.productsQuantity - product.quantity;
            newState.totalPrice = newState.totalPrice - product.price * product.quantity;
            this.saveCartItemInStorage()
            return newState;
        });



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
                        <Products products={this.state.cartItems}
                                  increase={(id) => this.increaseQuantity(id)}
                                  decrease={(id) => this.decreaseQuantity(id)}
                                  delete={(id) => this.deleteProduct(id)}/>
                    </Col>

                }

            </Row>
        </Container>
    }

}

export default MainPage;