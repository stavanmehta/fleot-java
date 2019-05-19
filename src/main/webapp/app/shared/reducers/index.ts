import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import turo, {
  TuroState
} from 'app/entities/turo/turo.reducer';
// prettier-ignore
import album, {
  AlbumState
} from 'app/entities/album/album.reducer';
// prettier-ignore
import photo, {
  PhotoState
} from 'app/entities/photo/photo.reducer';
// prettier-ignore
import tag, {
  TagState
} from 'app/entities/tag/tag.reducer';
// prettier-ignore
import fleetOwner, {
  FleetOwnerState
} from 'app/entities/fleet-owner/fleet-owner.reducer';
// prettier-ignore
import car, {
  CarState
} from 'app/entities/car/car.reducer';
// prettier-ignore
import carType, {
  CarTypeState
} from 'app/entities/car-type/car-type.reducer';
// prettier-ignore
import driver, {
  DriverState
} from 'app/entities/driver/driver.reducer';
// prettier-ignore
import rental, {
  RentalState
} from 'app/entities/rental/rental.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly turo: TuroState;
  readonly album: AlbumState;
  readonly photo: PhotoState;
  readonly tag: TagState;
  readonly fleetOwner: FleetOwnerState;
  readonly car: CarState;
  readonly carType: CarTypeState;
  readonly driver: DriverState;
  readonly rental: RentalState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  turo,
  album,
  photo,
  tag,
  fleetOwner,
  car,
  carType,
  driver,
  rental,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
