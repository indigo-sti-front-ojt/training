import React from "react";
import "./App.css";
import { UserProvider } from "./provider/UserProvider";
import { RouterConfig } from "./router/RouterConfig";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <RouterConfig />
      </UserProvider>
    </div>
  );
}

export default App;
