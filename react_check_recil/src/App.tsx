import React from "react";
import { RecoilRoot } from "recoil";
import "./App.css";
import { Test1 as NonLib } from "./components/TestNonLibComponent";
import { Test1 as Lib } from "./components/TestUseLibComponent";
import { Test1 as Lib1 } from "./components/TestUseLibComponent1";

import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback, onError } from "./components/ErrorBoundaryLib";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <h1>ライブラリなし</h1>
        <NonLib />
        <h1>react-error-boundaryを使用してのパターン Recoil</h1>
        <Lib />
        <h1>react-error-boundaryを使用してのパターン useErrorHandler</h1>
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
          <Lib1 />
        </ErrorBoundary>
      </div>
    </RecoilRoot>
  );
}

export default App;
