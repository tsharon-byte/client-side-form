import React from 'react';
import PersonForm from "./PersonForm";
import DeletePersonForm from "./DeletePersonForm";
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
                    <Route path="/delete" component={DeletePersonForm}/>
                </Switch>
        </Router>
    );
}

export default Home;