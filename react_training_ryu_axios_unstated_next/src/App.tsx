import React from "react";
import "./App.css";

import { TestViewAxios } from "./views/TestViewAxios";
import { TestViewNext } from "./views/TestViewNext";

function App() {
  return (
    <div className="App">
      <div>
        <TestViewAxios />
      </div>
      <div>
        <TestViewNext />
      </div>
    </div>
  );
}

export default App;
