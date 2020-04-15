import React from 'react';
import PersonForm from "./PersonForm";
import PersonList from "./PersonList";
import About from "./About";
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
                    <Route exact path='/client-side-form' component={About}/>
                    <Route path="/form" component={PersonForm}/>
                    <Route path="/list" component={PersonList}/>
                </Switch>
        </Router>
    );
}

export default Home;