import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Feedback from "./pages/Feed-Back.jsx";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer";
import CurrencyConvertor from "./pages/currency-convertor";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Page Content */}
        <main className="flex-grow flex flex-col items-center justify-center">
          <div className="container">
            <Routes>
              <Route path="/" element={<CurrencyConvertor />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/about" element={<AboutUs />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
