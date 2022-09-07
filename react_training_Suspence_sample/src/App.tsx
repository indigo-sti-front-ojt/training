import React, { Suspense } from "react";
import "./App.css";
import { TestDBContainer } from "./provider/TestDBProvider";
import { TestView } from "./views/TestView";
import { TestView1 } from "./views/TestView1";
import { TestView2 } from "./views/TestView2";

function App() {
  console.log("app renda");

  return (
    <div className="App">
      {/* <TestView /> */}
      <Suspense fallback={<p>app loading</p>}>
        <TestDBContainer.Provider>
          <TestView2 />
        </TestDBContainer.Provider>
      </Suspense>
    </div>
  );
}

export default App;
