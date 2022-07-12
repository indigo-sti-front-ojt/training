import React from "react";
import { SignUp } from "../src/components/pages/SignUp";
import { AuthProvider } from "./context/authcontext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <SignUp />
      </div>
    </AuthProvider>
  );
}

export default App;
