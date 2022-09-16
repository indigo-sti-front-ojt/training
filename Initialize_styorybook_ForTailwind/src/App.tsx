import React from "react";
import "./App.css";
import { Button } from "./components/Button";

function App() {
  return (
    <div className="App">
      <Button
        outlined={false}
        size={"small"}
        onClick={() => (document.location.href = "https://reactjs.org")}
      >
        Submit
      </Button>
    </div>
  );
}

export default App;
