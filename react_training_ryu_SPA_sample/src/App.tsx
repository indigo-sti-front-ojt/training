import React from "react";
import "./App.css";
import { AuthUserContainer } from "./provider/AuthUserProvider";
import { SampleDBContainer } from "./provider/SampleDBProvider";
import { UserDBContainer } from "./provider/UserDBProvider";
import { RouterConfig } from "./router/RouterConfig";

function App() {
  return (
    <div className="App">
      <UserDBContainer.Provider>
        <SampleDBContainer.Provider>
          <AuthUserContainer.Provider>
            <RouterConfig />
          </AuthUserContainer.Provider>
        </SampleDBContainer.Provider>
      </UserDBContainer.Provider>
    </div>
  );
}

export default App;
