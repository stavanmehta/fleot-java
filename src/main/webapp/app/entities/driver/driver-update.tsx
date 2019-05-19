import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICar } from 'app/shared/model/car.model';
import { getEntities as getCars } from 'app/entities/car/car.reducer';
import { IFleetOwner } from 'app/shared/model/fleet-owner.model';
import { getEntities as getFleetOwners } from 'app/entities/fleet-owner/fleet-owner.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './driver.reducer';
import { IDriver } from 'app/shared/model/driver.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDriverUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDriverUpdateState {
  isNew: boolean;
  carId: string;
  fleetownerId: string;
}

export class DriverUpdate extends React.Component<IDriverUpdateProps, IDriverUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      carId: '0',
      fleetownerId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCars();
    this.props.getFleetOwners();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.updatedAt = convertDateTimeToServer(values.updatedAt);

    if (errors.length === 0) {
      const { driverEntity } = this.props;
      const entity = {
        ...driverEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/driver');
  };

  render() {
    const { driverEntity, cars, fleetOwners, loading, updating } = this.props;
    const { isNew } = this.state;

    const { licenseImage, licenseImageContentType, nidImage, nidImageContentType, image, imageContentType } = driverEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="fleotappApp.driver.home.createOrEditLabel">Create or edit a Driver</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : driverEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="driver-id">ID</Label>
                    <AvInput id="driver-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="firstNameLabel" for="driver-firstName">
                    First Name
                  </Label>
                  <AvField
                    id="driver-firstName"
                    type="text"
                    name="firstName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="driver-lastName">
                    Last Name
                  </Label>
                  <AvField
                    id="driver-lastName"
                    type="text"
                    name="lastName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="driver-email">
                    Email
                  </Label>
                  <AvField
                    id="driver-email"
                    type="text"
                    name="email"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="genderLabel" for="driver-gender">
                    Gender
                  </Label>
                  <AvInput
                    id="driver-gender"
                    type="select"
                    className="form-control"
                    name="gender"
                    value={(!isNew && driverEntity.gender) || 'MALE'}
                  >
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                    <option value="OTHER">OTHER</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="phoneLabel" for="driver-phone">
                    Phone
                  </Label>
                  <AvField
                    id="driver-phone"
                    type="text"
                    name="phone"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLine1Label" for="driver-addressLine1">
                    Address Line 1
                  </Label>
                  <AvField
                    id="driver-addressLine1"
                    type="text"
                    name="addressLine1"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLine2Label" for="driver-addressLine2">
                    Address Line 2
                  </Label>
                  <AvField id="driver-addressLine2" type="text" name="addressLine2" />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="driver-city">
                    City
                  </Label>
                  <AvField
                    id="driver-city"
                    type="text"
                    name="city"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="countryLabel" for="driver-country">
                    Country
                  </Label>
                  <AvField
                    id="driver-country"
                    type="text"
                    name="country"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="licenseNoLabel" for="driver-licenseNo">
                    License No
                  </Label>
                  <AvField
                    id="driver-licenseNo"
                    type="text"
                    name="licenseNo"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="licenseImageLabel" for="licenseImage">
                      License Image
                    </Label>
                    <br />
                    {licenseImage ? (
                      <div>
                        <a onClick={openFile(licenseImageContentType, licenseImage)}>
                          <img src={`data:${licenseImageContentType};base64,${licenseImage}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {licenseImageContentType}, {byteSize(licenseImage)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('licenseImage')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_licenseImage" type="file" onChange={this.onBlobChange(true, 'licenseImage')} accept="image/*" />
                    <AvInput
                      type="hidden"
                      name="licenseImage"
                      value={licenseImage}
                      validate={{
                        required: { value: true, errorMessage: 'This field is required.' }
                      }}
                    />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="nidLabel" for="driver-nid">
                    Nid
                  </Label>
                  <AvField
                    id="driver-nid"
                    type="text"
                    name="nid"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="nidImageLabel" for="nidImage">
                      Nid Image
                    </Label>
                    <br />
                    {nidImage ? (
                      <div>
                        <a onClick={openFile(nidImageContentType, nidImage)}>
                          <img src={`data:${nidImageContentType};base64,${nidImage}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {nidImageContentType}, {byteSize(nidImage)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('nidImage')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_nidImage" type="file" onChange={this.onBlobChange(true, 'nidImage')} accept="image/*" />
                    <AvInput
                      type="hidden"
                      name="nidImage"
                      value={nidImage}
                      validate={{
                        required: { value: true, errorMessage: 'This field is required.' }
                      }}
                    />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="imageLabel" for="image">
                      Image
                    </Label>
                    <br />
                    {image ? (
                      <div>
                        <a onClick={openFile(imageContentType, image)}>
                          <img src={`data:${imageContentType};base64,${image}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {imageContentType}, {byteSize(image)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('image')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_image" type="file" onChange={this.onBlobChange(true, 'image')} accept="image/*" />
                    <AvInput
                      type="hidden"
                      name="image"
                      value={image}
                      validate={{
                        required: { value: true, errorMessage: 'This field is required.' }
                      }}
                    />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="createdAtLabel" for="driver-createdAt">
                    Created At
                  </Label>
                  <AvInput
                    id="driver-createdAt"
                    type="datetime-local"
                    className="form-control"
                    name="createdAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.driverEntity.createdAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updatedAtLabel" for="driver-updatedAt">
                    Updated At
                  </Label>
                  <AvInput
                    id="driver-updatedAt"
                    type="datetime-local"
                    className="form-control"
                    name="updatedAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.driverEntity.updatedAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="driver-car">Car</Label>
                  <AvInput id="driver-car" type="select" className="form-control" name="car.id">
                    <option value="" key="0" />
                    {cars
                      ? cars.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="driver-fleetowner">Fleetowner</Label>
                  <AvInput id="driver-fleetowner" type="select" className="form-control" name="fleetowner.id">
                    <option value="" key="0" />
                    {fleetOwners
                      ? fleetOwners.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/driver" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  cars: storeState.car.entities,
  fleetOwners: storeState.fleetOwner.entities,
  driverEntity: storeState.driver.entity,
  loading: storeState.driver.loading,
  updating: storeState.driver.updating,
  updateSuccess: storeState.driver.updateSuccess
});

const mapDispatchToProps = {
  getCars,
  getFleetOwners,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriverUpdate);
