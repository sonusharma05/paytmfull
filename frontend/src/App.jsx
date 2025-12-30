import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Heading } from "./components/heading"
import { Signup } from "./pages/signup"
import { Signin } from "./pages/signin"
import { SubHeading } from "./components/Subheading"
import { InputBox } from "./components/InputBox"
import { Button } from "./components/Button"

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        {/* <Route path="/paytm/frontend/src/pages/dashboard.jsx" element={<Dashboard/>}></Route>
        <Route path="/paytm/frontend/src/pages/send" element={<SendMoney/>}></Route> */}
      </Routes>
    </BrowserRouter>
    </>
   
  )
}

export default App
