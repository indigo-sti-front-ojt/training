import React from "react";
import "./App.css";
import { AuthUserProvider } from "./provider/AuthUserProvider";
import { UserProvider } from "./provider/UserProvider";
import { RouterConfig } from "./router/RouterConfig";

function App() {
  return (
    <div className="App">
      <AuthUserProvider>
        <UserProvider>
          <RouterConfig />
        </UserProvider>
      </AuthUserProvider>
    </div>
  );
}

export default App;
