import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from './pages/Login';
import { InteractiveMap } from './pages/Map';

export default function App(): JSX.Element {
    return (
        <Switch>
            <Route path="/map">
                <InteractiveMap />
            </Route>

            <Route path="/">
                <Login />
            </Route>
        </Switch>
    );
}
