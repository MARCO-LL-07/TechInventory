import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;