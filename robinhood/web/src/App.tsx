import './App.css';
import Navbar from "./components/Navbar"
import logo from './pictures/robinhood.webp';
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <h1>Shusheng Li</h1>
      <div>
        <img src={logo} />
      </div>
    </div >
  );
}
export default App;
