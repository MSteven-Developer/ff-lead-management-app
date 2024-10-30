import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LeadForm from './Pages/Lead/LeadForm';

const Routes = () => {
    return (
        <Switch>
            <Route path="/lead" component={LeadForm} />
            <Route path="/lead/create" component={LeadForm} />
        </Switch>
    );
};

export default Routes;