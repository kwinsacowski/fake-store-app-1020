import { Link } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";

function Home() {
  return (
    <div className="hero-section">
      <Container className="d-flex flex-column align-items-center justify-content-center h-100 py-5">
        <Row className="w-100 align-items-center">
          <Col lg={8} className="mx-auto text-center">
            <h1 className="display-3 fw-bold mb-4 welcome-text">
              Welcome to Our Fake Store
            </h1>
            <p className="lead mb-5 text-dark">
              Discover our curated collection of amazing products at unbeatable prices.
              Start shopping today!
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <Button
                as={Link}
                to="/productList"
                variant="info"
                size="lg"
                className="hero-btn"
              >
                Browse Products
              </Button>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home;