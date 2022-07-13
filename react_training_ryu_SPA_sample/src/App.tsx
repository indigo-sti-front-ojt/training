import React from "react";
import "./App.css";
import { AuthUserContainer } from "./provider/AuthUserProvider";
import { RouterConfig } from "./router/RouterConfig";

function App() {
  return (
    <div className="App">
      <AuthUserContainer.Provider>
        <RouterConfig />
      </AuthUserContainer.Provider>
    </div>
  );
}

export default App;
