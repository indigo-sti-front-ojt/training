import React from "react";
import "./App.css";
import { Providers } from "./provider/Providers";

import { RouterConfig } from "./router/RouterConfig";

function App() {
  return (
    <div className="App h-screen flex flex-col relative">
      <Providers>
        <RouterConfig />
      </Providers>
    </div>
  );
}

export default App;
