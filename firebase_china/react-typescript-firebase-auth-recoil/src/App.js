import "./App.css";
import { atom } from "recoil";

// auth情報を保持するatomの定義
const authState = atom({
  key: "authState",
  default: null,
});

function App() {
  return <div className="App">

  </div>;
}

export default App;
