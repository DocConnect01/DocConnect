import React from "react";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "../src/components/login/Login";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
 
<BrowserRouter>
<Routes>
  <Route path="/login" element= {<LoginForm/>}/>
  <Route path="/home" element= {<Home/>}/>


</Routes>

</BrowserRouter>

  );
};

export default App;
