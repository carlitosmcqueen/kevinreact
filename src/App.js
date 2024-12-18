import './App.css';
import Navbar from './componentes/navbar';
import Footer from './componentes/footer';
import { CartProvider } from './context/carrito';
import CartModal from './context/carritoModal';
import AppRoutes from "./routes/Routes";
import { BrowserRouter as Router} from "react-router-dom";



function App() {
  return (
    <CartProvider>
      <Router>
        <CartModal />
        <Navbar />
        <div className="App-header">
          <AppRoutes></AppRoutes>
        </div>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
