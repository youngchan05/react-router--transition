import logo from './logo.svg';
import './App.css';
import Router from './router/Router';
import { Link } from 'react-router-dom';
function App() {
  return (
    <div className="App">
        <div style={{position:'fixed', left:0, top:'50px', zIndex:10}}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <Router/>
    </div>
  );
}

export default App;
