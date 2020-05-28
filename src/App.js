import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Join from "./Components/Join";
import GameStartScreen from "./Components/GameStartScreen";

const App = () => {
    return (
        <Router>
            <Route path={'/'} exact component={Join}/>
            <Route path="/room" component={GameStartScreen}/>
        </Router>
    )
};

export default App;
