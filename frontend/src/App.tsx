import React from "react";

import LoginForm from "../src/components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
 
<BrowserRouter>
<Routes>
  <Route path="/login" element= {<LoginForm/>}/>
</Routes>

</BrowserRouter>

  );
};

export default App;
