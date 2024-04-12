import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import ProductList from "./ProductList"
import ProductAdd from "./ProductAdd"
import ProductEdit from "./ProductEdit"
import Signin from "./Signin"
import Signup from "./Signup"

function App() {
  
  return (
    <div className="container my-5">
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/products" element = {<ProductList/>} />
        <Route path="/products/add" element = {<ProductAdd/>} />
        <Route path="/products/:id/edit" element = {<ProductEdit/>} />
        <Route path="/signin" element = {<Signin/>} />
        <Route path="/signup" element = {<Signup/>} />
      </Routes>
    </div>
  )
}

export default App
