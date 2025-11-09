
import { Card, CardBody } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react"

function ProductList(){

  const[products, setProducts] = useState([]);
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState();

      useEffect (()=>{
    axios.get('https://fakestoreapi.com/products')
    .then(response => {
      setProducts(response.data);
      setLoading(false);
    })
    .catch((error) => {
      setError("No Mo Products");
      setLoading(false);
    })
  },[]);


  if (loading) return <p>Loading Products...</p>
  if (error) return <p>{error}</p>

  return (
      <div className='mt-2'>
        <h1 className="text-center mb-4">Product List</h1>
        <Container>
          <Row>
            {products.map((product)=>(
              <Col key ={product.id} md={4} className="mb-2">
                <Card  className="product-card shadow-sm">
                  <Card.Img variant="top" src={product.image} alt={product.name} className="productlist-img"/>
                  <CardBody>
                    <Card.Title className="text-center">{product.title}</Card.Title>
                    <Card.Text className="price-text">${product.price.toFixed(2)}</Card.Text>
                  </CardBody>
                  <Link className="custom-button" to={`/products/${product.id}`}>View Details</Link>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        
      </div>
  )
}

export default ProductList
