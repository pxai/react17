import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Page from './Page';
import Panel from './Panel';
import About from './About';
import Admin from './Admin';

export default class Navigation extends React.Component {
    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" >
                        <Page><Panel /></Page>
                    </Route>  
                    <Route exact path="/admin" >
                        <Page><Admin /></Page>
                    </Route>  
                    <Route exact path="/about">
                        <Page><About /></Page>
                    </Route>
                </Switch> 
            </BrowserRouter>
        );
    }
}