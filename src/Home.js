import React from 'react';
import PersonForm from "./PersonForm";
import PersonList from "./PersonList";
import Nav from "./Nav";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

function Home() {
    return (
        <Router>
                <Nav/>
                <Switch>
                    <Route path="/form" component={PersonForm}/>
                    <Route path="/list" component={PersonList}/>
                </Switch>
        </Router>
    );
}

export default Home;