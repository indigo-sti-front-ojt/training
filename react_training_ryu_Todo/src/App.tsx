import React from "react";
import "./App.css";
import { TodoContainer } from "./Providers/TodoList";
import { RouterConfig } from "./Router/RouterConfig";

function App() {
  return (
    <div className="App">
      <TodoContainer.Provider>
        <RouterConfig />
      </TodoContainer.Provider>
    </div>
  );
}

export default App;
