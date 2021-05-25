import React from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import Join from './Components/Join/Join';
import Meet from './Components/Meet/Meet';
function App() {

  return (
    <Router>
      <div className="App">
        <Route path='/' exact component={Join}/>
        <Route path='/chat' component={Meet}/>
      </div>
    </Router>
  );
}

export default App;
