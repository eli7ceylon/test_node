import React from 'react'
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

class Products extends React.Component
{
  constructor(props) {
    super(props);
  }


  render()
  {
    return <ListGroup className='products-list'>
      {  this.props.products && this.props.products.map( product =>{
    return (
            <ListGroupItem>

              <span>  {product.name} : </span>
               <span>&nbsp;&nbsp;&nbsp; {product.price} $ X </span>


              <Button  variant="outline-primary" disabled={!product.quantity} className="btn-product-list" onClick={() => this.props.decrease(product.id)} >
                  <FontAwesomeIcon icon={faMinus}/>
                </Button>

              {product.quantity ? product.quantity : 0 }
              <Button className="btn-product-list" onClick={() => this.props.increase(product.id)} >
                <FontAwesomeIcon icon={faPlus}/>
              </Button>

              = { product.price * product.quantity} $ &nbsp;
              <button className="btn-product-list" onClick={() => this.props.delete(product.id)}  >
              <FontAwesomeIcon icon={faTrash}/>
            </button>
            </ListGroupItem>
        )

    })
      }
    </ListGroup>
  }
}
export default Products;

