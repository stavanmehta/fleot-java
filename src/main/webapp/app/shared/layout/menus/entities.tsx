import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/turo">
      Turo
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/album">
      Album
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/photo">
      Photo
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/tag">
      Tag
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/fleet-owner">
      Fleet Owner
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/car">
      Car
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/car-type">
      Car Type
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/driver">
      Driver
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/rental">
      Rental
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
