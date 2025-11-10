# FakeStore E-Commerce App

A responsive e-commerce web applicatioon built with React, React Router, Axios, and React Bootstrap, data pulled from the https://fakestoreapi.com/.
Users can view, add, edit, and dleete products through simulated API interactions. Demonstrating practice in API integration, state management, and componet-based architecture in React.

    Note: FakeStoreAPI is a mock testing API.
    POST, PUT, and DELETE requests will appear successful but will not persist.

📖 Table of Contents

1. Overview
2. Project Structure
3. Technologies Used
4. Setup Instructions
5. API Information
6. Author
7. License


Overview
    Home Page
        - Welcoming hero section
        - "Browse Products" button to navigate to product list
        - Styled with React Bootstrap for responsive design

    Product List Page (/productList)
        - Gets products dynamically from FakeStoreAPI with axios
        - Diplays product cards with image, title, and price
        - Cards are styled dynamically to each be the same size
        - "View Details" button for each pproduct navigates to product's details
        - Handles loading and error states
    
    Product Details PAge (/products/:id)
        - Gets and displays full details for a single product
        - Utilizies useParms to pull ID from URL
        - Displays title, description, category, price, and image
        - Includes interactive features:
            - Edit Product: Opens editable form with prefilled data
            - Delete Product: Shows confirmation modal before deletion
            - Add to Cart button (Not functional)
        - Displays success abnd error alerts for Actions

    Add PProducts PAge (/addproduct)
        - Includes form fields for Title, Description, Category, Price, and Image URL
        - Sends POST request to FakeStoreAPI to simulate product creation
        - Displays a success alert when submitted
        - Automatically clears and resets form after submission for an addition submission

    Navigation Bar
        - Present on every page
        - Includes links to Home, Products, and Add Product
        - Collapsible and fully responsive for mobile view

    Miscellaneous 
        - Success and error alerts for API feedback
        - Loading and erroir handling throughout App
        - Responsive layout using React Bootstrap Grid system
        - Clean, modern UI with hover effects on product cards

📝Project Structure
src/
├── components/
│   ├── AddProduct.jsx
│   ├── Home.jsx
│   ├── NavBar.jsx
│   ├── ProductDetails.jsx
│   └── ProductList.jsx
│
├── App.jsx
├── main.jsx
└── index.css

Technologies Used
| Technology           | Purpose                          |
| -------------------- | -------------------------------- |
| **React (Vite)**     | Frontend framework               |
| **React Router DOM** | Page routing and navigation      |
| **Axios**            | API requests and CRUD operations |
| **React Bootstrap**  | Layout and UI components         |
| **FakeStoreAPI**     | Mock API for product data        |


Setup Instructions
1. Clone repository
    git clone https://github.com/kwinsacowski/fake-store-app-1020.git
    cd fakestore-app

2. Install dependencies
    npm install axios react-router-dom react-bootstrap bootstrap

3. Start the dev server
    npm run dev

4. Access in browser
    Visit local host provided

API Information
| Method | Endpoint        | Description                      |
| ------ | --------------- | -------------------------------- |
| GET    | `/products`     | Fetch all products               |
| GET    | `/products/:id` | Fetch a single product           |
| POST   | `/products`     | Create a new product (mock only) |
| PUT    | `/products/:id` | Update a product (mock only)     |
| DELETE | `/products/:id` | Delete a product (mock only)     |


🧑‍💻 Author
Developed by: Kayla Salmon
React | API Integration | Front-End Development

🪪 License
This project was created for educational purposes using the free and public FakeStoreAPI.
All images and product data belong to their respective owners.
