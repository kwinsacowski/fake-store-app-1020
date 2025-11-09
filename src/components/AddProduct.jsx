import axios from "axios";
import { useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import Form from 'react-bootstrap/Form';


function AddProduct(){

  const [ProductDetails, setProduct] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://fakestoreapi.com/products", formData);
      console.log(response.data);
      setProduct(response.data);
      setSubmitted(true);
      setError('');
      setFormData({
        title: '',
        description: '',
        category: '',
        price: '',
        image: '',
  });
    setTimeout(() => {
        setSubmitted(false);
      }, 3000);

    } catch (error){
      setError(`Error adding Product, Try again: ${error.message}`);
      setSubmitted(false);
    }
  }

  return (
    <Container className="mt-5">
      <h2 className="mt-5">Add Product</h2>

      {submitted && <Alert variant="success" dismissible>Product Added!</Alert>}
      {error && <Alert variant="danger" dismissible>Unable to add product: {error}</Alert>}

      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Product Name" name="title" value={formData.title} onChange={handleChange} required></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Description" name="description" value={formData.description} onChange={handleChange} required></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" placeholder="Category" name="category" value={formData.category} onChange={handleChange} required></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" placeholder="How much?" name="price" value={formData.price} onChange={handleChange} required></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control type="text" placeholder="Image of product" name="image" value={formData.image} onChange={handleChange}></Form.Control>
        </Form.Group>

        <Button variant="primary" type="Submit">Submit</Button>
      </Form>
    </Container>
  )
}

export default AddProduct
