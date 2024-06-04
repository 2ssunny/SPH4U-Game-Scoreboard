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
        <p className="App-header_text">SPH4U Game Score Board</p>
      </header>
      <div className="App-body1">
        <Score></Score>
      </div>
      <div className="App-body2">
        <Ranking></Ranking>
      </div>
    </div>
  );
}

export default Render;
