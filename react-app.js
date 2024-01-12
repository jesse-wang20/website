// react-app.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const ReactPage = () => (
    <div>
        <h2>React Page Content</h2>
        <p>This content is rendered using React.</p>
    </div>
);

const App = () => (
    <Router>
        <div>
            <Route path="/react" component={ReactPage} />
        </div>
    </Router>
);

// Mount the React app onto the specified HTML element
ReactDOM.render(<App />, document.getElementById('react-root'));
