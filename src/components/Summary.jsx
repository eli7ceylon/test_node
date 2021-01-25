import React, { Component } from "react";
import {Row} from "react-bootstrap";
import { connect } from "react-redux";
// import util from "../util";
class Summary extends Component {

    render() {
        return <div>
            <div className="row">
                Sub-Total : {this.props.totalPrice} $

            </div>
            <div className="row">

                <span>
                    Shipping cost :
                </span>
                {
                    this.props.productsQuantity >= 4 && <span> 40 $</span>
                }
                {
                    this.props.productsQuantity < 4 && <span>  25 $</span>
                }
            </div>
            <div className="row">
                <h3>Total Price: <span>
                {   this.props.productsQuantity >= 4 ? this.props.totalPrice + 40 : this.props.totalPrice + 25 } $
            </span></h3>
            </div>

        </div>
    }
}

export default Summary;