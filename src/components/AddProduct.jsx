import axios from "axios";
import { useState } from "react";
import { Container, Form, Button, Alert, FormGroup, FormLabel } from "react-bootstrap";


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
    } catch (error){
      setError(`Error adding Product, Try again fool: ${error.message}`);
      setSubmitted(false);
    }
  }

  return (
    <Container className="mt-5
    ">
      <h2 className="mt-5">Add Product</h2>

      {submitted && <Alert variant="success" dismissible>It fucking worked!</Alert>}
      {error && <Alert variant="danger" dismissible>You're stoooooopid: {error}</Alert>}

      <Form onSubmit={handleSubmit}>

        <FormGroup className="mb-3">
          <FormLabel>Title</FormLabel>
          <Form.Control type="text" placeholder="What's it's name?" name="title" value={formData.title} onChange={handleChange} required></Form.Control>
        </FormGroup>

        <FormGroup className="mb-3">
          <FormLabel>Description</FormLabel>
          <Form.Control type="text" placeholder="What it do?" name="description" value={formData.description} onChange={handleChange} required></Form.Control>
        </FormGroup>

        <FormGroup className="mb-3">
          <FormLabel>Category</FormLabel>
          <Form.Control type="text" placeholder="What it do?" name="category" value={formData.category} onChange={handleChange} required></Form.Control>
        </FormGroup>

        <FormGroup className="mb-3">
          <FormLabel>Price</FormLabel>
          <Form.Control type="text" placeholder="How much?" name="price" value={formData.price} onChange={handleChange} required></Form.Control>
        </FormGroup>

        <FormGroup className="mb-3">
          <FormLabel>Image</FormLabel>
          <Form.Control type="text" placeholder="What it look like?" name="image" value={formData.image} onChange={handleChange} required></Form.Control>
        </FormGroup>

        <Button variant="primary" type="Submit">Submit</Button>
      </Form>
    </Container>
  )
}

export default AddProduct
