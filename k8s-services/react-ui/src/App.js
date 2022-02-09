import logo from './logo.svg';
import './App.css';
import Counter from './Counter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Canary Page</p>
        <img src={logo} className="App-logo" alt="logo" />
        <Counter/>
      </header>
    </div>
  );
}

export default App;
