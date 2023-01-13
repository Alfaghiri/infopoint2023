import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Bib from "./Bib";
import Buchen from "./Buchen";
import Home from "./Home";
import Jobs from "./Jobs";
import News from "./News";
import Shop from "./Shop";
import Events from "./Events";
import Resturant from "./Resturant";
import Unimap from "./Unimap";

const App = () => {
  return (
    <div className="bg-dark">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buchen" element={<Buchen />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/bib" element={<Bib />} />
          <Route path="/news" element={<News />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/events" element={<Events />} />
          <Route path="/Resturant" element={<Resturant />} />
          <Route path="/map" element={<Unimap />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
