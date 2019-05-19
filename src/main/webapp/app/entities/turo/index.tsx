import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Turo from './turo';
import TuroDetail from './turo-detail';
import TuroUpdate from './turo-update';
import TuroDeleteDialog from './turo-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TuroUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TuroUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TuroDetail} />
      <ErrorBoundaryRoute path={match.url} component={Turo} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TuroDeleteDialog} />
  </>
);

export default Routes;
