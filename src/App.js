import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EventPage from "./EventPage";
import Newitem from "./Newitem";
import About from "./About";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">ホーム</Link> | <Link to="/newitem">カテゴリ追加</Link>
      </nav>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/newitem" element={<Newitem />} />
        <Route path="/event/:eventID" element={<EventPage />} />
      </Routes>
    </Router>
  );
}

export default App;
