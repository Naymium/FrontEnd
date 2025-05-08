import "../CSS/App.css";
import AppRoutes from "../Router.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
