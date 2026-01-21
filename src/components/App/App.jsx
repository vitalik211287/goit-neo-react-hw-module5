import {  Routes, Route } from "react-router";
import "./App.css";

function App() {
    return (
      <div className="container">
        <Routes>
          <Route path="/" element={<div>Hello, World!</div>} />
        </Routes>
      </div>
    );
}

export default App;
