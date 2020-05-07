/** @jsx jsx */
import * as React from 'react';
import { jsx } from '@emotion/core';
import { Route, Switch } from 'react-router-dom';
import { WanderlistProvider } from './provider/wanderlistProvider';
import { LandingPage } from './components/login';
import { InteractiveMap } from './components/map';

export default function App(): JSX.Element {
    return (
        <Switch>
            <Route path="/map">
                <WanderlistProvider>
                    <InteractiveMap />
                </WanderlistProvider>
            </Route>

            <Route path="/">
                <WanderlistProvider>
                    <LandingPage />
                </WanderlistProvider>
            </Route>
        </Switch>
    );
}
