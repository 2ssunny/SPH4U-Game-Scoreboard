import "./App.css";
import Score from "./Components/Score.js";
import Ranking from "./Components/Ranking.js";

import ReactDOM from "react-dom";

function Render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>SPH4U Game Score Board</p>
      </header>
      <Score></Score>
      <Ranking></Ranking>
    </div>
  );
}

export default Render;
