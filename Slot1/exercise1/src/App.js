import logo from './logo.svg';
import './App.css';

function App() {
  const myname = "Bui Thi Tuyet Nhi"; 

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello React</h1>
        <p>
          My name is {myname} and I am learning React!
        </p>
      </header>
    </div>
  );
}

export default App;
