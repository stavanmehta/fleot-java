import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FleetOwner from './fleet-owner';
import FleetOwnerDetail from './fleet-owner-detail';
import FleetOwnerUpdate from './fleet-owner-update';
import FleetOwnerDeleteDialog from './fleet-owner-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FleetOwnerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FleetOwnerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FleetOwnerDetail} />
      <ErrorBoundaryRoute path={match.url} component={FleetOwner} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FleetOwnerDeleteDialog} />
  </>
);

export default Routes;
