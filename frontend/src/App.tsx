import React from "react";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import LoginForm from "../src/components/login/Login";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <LoginForm />
      </div>
    </Provider>
  );
};

export default App;
