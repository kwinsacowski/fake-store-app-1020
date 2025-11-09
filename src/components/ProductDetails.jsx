import { Button, Card, Container, Alert, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails () {

  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleted, setDeleted] = useState (false);
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    image: ""
  });

  //Load
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load product");
        setLoading(false);
      })
  }, [id]);

  //Deleting
  const handleDelete = async () => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`)
      setDeleted(true);
    } catch (err) {
      setError(`Failed to delete product: ${err.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (deleted) {
      const timer = setTimeout(() => navigate("/productList"), 1000);
      return () => clearTimeout(timer);
    }
  }, [deleted, navigate]);


  //Editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedProduct = {
    ...product,
    title: formData.title || product.title,
    description: formData.description || product.description,
    category: formData.category || product.category,
    price: formData.price || product.price,
    image: formData.image || product.image,
  };

    try {
      await axios.put(`https://fakestoreapi.com/products/${id}`, formData);
      setProduct(updatedProduct); 
      setEditing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      navigate(``)
    } catch (err) {
      setError(`Failed to update product: ${err.message}`);
    }
  };

  //loading and error control
  if (loading) return <Container className="mt-5"><p>Loading product...</p></Container>
  if (error) return <Container className="mt-5"><p className="text-danger">{error}</p></Container>

  return (
    <Container className="mt-5">
      <Card>
        <Card.Img
          variant="top"
          src={product?.image} alt={product?.title || 'Product image'} 
          className="mt-2 product-img"
        />
        <Card.Body className="d-flex flex-column">
          {success && (
            <Alert variant="success" dismissible onClose={() => setSuccess(false)}>
              Product updated successfully!
            </Alert>
          )}
          
          {editing ? (
            // Edit
            <div>
            <p><strong>Now Editing:</strong> {product.title}</p>
            <Form onSubmit={handleUpdate} className="mt-2">
              <Form.Group className="mb-2">
                <Form.Label>Title</Form.Label>
                <Form.Control name="title" value={formData.title} onChange={handleChange}/>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control name="description" value={formData.description} onChange={handleChange}/>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Category</Form.Label>
                <Form.Control name="category" value={formData.category} onChange={handleChange}/>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" step="0.01" name="price" value={formData.price} onChange={handleChange}/>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>New Image URL</Form.Label>
                <Form.Control name="image" value={formData.image} onChange={handleChange}/>
              </Form.Group>

              <div className="d-flex justify-content-between mt-3">
                <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
                <Button variant="primary" type="submit">Update Product</Button>
              </div>
            </Form>
            </div>
          ) : (
            // View
            <>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>{product.category}</Card.Text>
              <div className="mt-auto d-flex justify-content-between align-items-center">
                <Card.Text className="text-success fw-bold">${product.price ? product.price.toFixed(2) : '—'}</Card.Text>
                {deleted && (
                  <Alert variant="danger" dismissible onClose={() => navigate("/productList")}>
                    Product deleted successfully!
                  </Alert>
                )}
              </div>
              <div className="mt-auto d-flex justify-content-between align-items-center">
                <Button variant="info">Add to Cart</Button>
                <div className="d-flex gap-2">
                  <Button variant="secondary" onClick={() => {
                    setFormData({
                      title: product.title,
                      description: product.description,
                      category: product.category,
                      price: product.price,
                      image: product.image
                    });
                    setEditing(true)
                  }}>Edit</Button>

                  <Button variant="danger" onClick={() => setShowModal(true)} name="Delete">
                    X
                  </Button>

                  <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter" className="text-danger">
                        CAUTION!
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <h4>Are you sure you want to delete?</h4>
                      <p>
                        <em>This will remove the product as available. To relist the product it will need to be added as a new product through the "Add Product" page.</em>
                      </p>
                    </Modal.Body>
                    <Modal.Footer className="mt-auto d-flex justify-content-between align-items-center">
                      <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => {
                        handleDelete();
                        setShowModal(false)
                        }}>Yes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ProductDetails