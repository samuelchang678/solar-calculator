import "./App.scss";
import { RoutePage } from "./Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="pages">
        <RoutePage />
      </div>
    </BrowserRouter>
  );
}

export default App;
