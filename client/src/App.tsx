import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LandingPage } from './pages/Landing';
import { InteractiveMap } from './pages/Map';

export default function App(): JSX.Element {
    return (
        <Switch>
            <Route path="/map">
                <InteractiveMap />
            </Route>

            <Route path="/">
                <LandingPage />
            </Route>
        </Switch>
    );
}
