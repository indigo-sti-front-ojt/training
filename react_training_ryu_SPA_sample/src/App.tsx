import React from "react";
import "./App.css";
import { AuthUserContainer } from "./provider/AuthUserProvider";
import { SampleDBContainer } from "./provider/SampleDBProvider";
import { RouterConfig } from "./router/RouterConfig";

function App() {
  return (
    <div className="App">
      <SampleDBContainer.Provider>
        <AuthUserContainer.Provider>
          <RouterConfig />
        </AuthUserContainer.Provider>
      </SampleDBContainer.Provider>
    </div>
  );
}

export default App;
