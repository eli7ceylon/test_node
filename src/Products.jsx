import React from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

// import '../../contact.css'
// import {faSync, faArrowAltCircleLeft} from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Button, FormGroup, Input } from 'reactstrap';
// import {Link} from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';


class Products extends React.Component
{
  constructor(props) {
    super(props);
  }


  render()
  {
    return <ListGroup>
      {  this.props.products && this.props.products.map( product =>{
        debugger
    return <div>
      {product.name}
      <button style={{border: 'none', background: 'none'}}>
        +
      </button>
      <button style={{border: 'none', background: 'none'}} >
        -
      </button>
      <button style={{border: 'none', background: 'none'}}>
        <FontAwesomeIcon icon={faTrash}/>
      </button>
        </div>
    })
      }
    </ListGroup>
  }
}
export default Products;

