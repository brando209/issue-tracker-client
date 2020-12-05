import logo from './logo.svg';
import './App.css';

import IssueTracker from './IssueTracker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <IssueTracker></IssueTracker>
    
    </div>
  );
}

export default App;
