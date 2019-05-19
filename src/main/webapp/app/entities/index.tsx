import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Turo from './turo';
import Album from './album';
import Photo from './photo';
import Tag from './tag';
import FleetOwner from './fleet-owner';
import Car from './car';
import CarType from './car-type';
import Driver from './driver';
import Rental from './rental';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/turo`} component={Turo} />
      <ErrorBoundaryRoute path={`${match.url}/album`} component={Album} />
      <ErrorBoundaryRoute path={`${match.url}/photo`} component={Photo} />
      <ErrorBoundaryRoute path={`${match.url}/tag`} component={Tag} />
      <ErrorBoundaryRoute path={`${match.url}/fleet-owner`} component={FleetOwner} />
      <ErrorBoundaryRoute path={`${match.url}/car`} component={Car} />
      <ErrorBoundaryRoute path={`${match.url}/car-type`} component={CarType} />
      <ErrorBoundaryRoute path={`${match.url}/driver`} component={Driver} />
      <ErrorBoundaryRoute path={`${match.url}/rental`} component={Rental} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
