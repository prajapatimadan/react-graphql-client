import logo from './logo.svg';
import './App.css';
import { Student } from './modules/students';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        
      </header> */}
      <Student/>
    </div>
  );
}

export default App;
