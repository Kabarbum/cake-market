import './App.css';
import Navbar from "./components/Navbar";
import AppRouter from "./components/AppRouter";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="App">
            <Navbar/>
            <AppRouter/>
            <Footer/>
        </div>
    );
}

export default App;
