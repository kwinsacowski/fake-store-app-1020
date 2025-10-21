import Home from "./components/Home"
import NavBar from "./components/NavBar"
import { Route, Routes } from "react-router-dom"
import ProductDetails from "./components/ProductDetails"
import ProductList from "./components/ProductList"
import AddProduct from "./components/AddProduct"



function App() {

  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/productList" element={<ProductList/>}></Route>
      <Route path="/products/:id" element={<ProductDetails />}></Route>
      <Route path="/addproduct" element={<AddProduct />}></Route>
    </Routes>
    </>
  )
}

export default App
