import { Card, CardBody, CardTitle, Container } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

function ProductDetails () {

    const { id } = useParams();
    const[product, setProduct] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState();

      useEffect (()=>{
    axios.get(`https://fakestoreapi.com/products/${id}`)
    .then(response => {
      setProduct(response.data);
      setLoading(false);
    })
    .catch((error) => {
      setError("No Mo Products");
      setLoading(false);
    })
  },[id]);

    if (loading) return <p>Loading Products...</p>
    if (error) return <p>{error}</p>

    return(
        <Container>
            <Card>
                <Card.Img variant="top" src={product.image} alt={product.title} />
                <CardBody>
                <CardTitle>{product.title}</CardTitle>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>${product.price.toFixed(2)}</Card.Text>
                </CardBody>
            </Card>
        </Container>
    )
}
export default ProductDetails