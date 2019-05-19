import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ITuro } from 'app/shared/model/turo.model';
import { getEntities as getTuros } from 'app/entities/turo/turo.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './fleet-owner.reducer';
import { IFleetOwner } from 'app/shared/model/fleet-owner.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFleetOwnerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFleetOwnerUpdateState {
  isNew: boolean;
  userId: string;
  turoId: string;
}

export class FleetOwnerUpdate extends React.Component<IFleetOwnerUpdateProps, IFleetOwnerUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      turoId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
    this.props.getTuros();
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
      const { fleetOwnerEntity } = this.props;
      const entity = {
        ...fleetOwnerEntity,
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
    this.props.history.push('/entity/fleet-owner');
  };

  render() {
    const { fleetOwnerEntity, users, turos, loading, updating } = this.props;
    const { isNew } = this.state;

    const { image, imageContentType } = fleetOwnerEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="fleotappApp.fleetOwner.home.createOrEditLabel">Create or edit a FleetOwner</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : fleetOwnerEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="fleet-owner-id">ID</Label>
                    <AvInput id="fleet-owner-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="companyNameLabel" for="fleet-owner-companyName">
                    Company Name
                  </Label>
                  <AvField
                    id="fleet-owner-companyName"
                    type="text"
                    name="companyName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="genderLabel" for="fleet-owner-gender">
                    Gender
                  </Label>
                  <AvInput
                    id="fleet-owner-gender"
                    type="select"
                    className="form-control"
                    name="gender"
                    value={(!isNew && fleetOwnerEntity.gender) || 'MALE'}
                  >
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                    <option value="OTHER">OTHER</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="phoneLabel" for="fleet-owner-phone">
                    Phone
                  </Label>
                  <AvField
                    id="fleet-owner-phone"
                    type="text"
                    name="phone"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLine1Label" for="fleet-owner-addressLine1">
                    Address Line 1
                  </Label>
                  <AvField
                    id="fleet-owner-addressLine1"
                    type="text"
                    name="addressLine1"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLine2Label" for="fleet-owner-addressLine2">
                    Address Line 2
                  </Label>
                  <AvField id="fleet-owner-addressLine2" type="text" name="addressLine2" />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="fleet-owner-city">
                    City
                  </Label>
                  <AvField
                    id="fleet-owner-city"
                    type="text"
                    name="city"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="countryLabel" for="fleet-owner-country">
                    Country
                  </Label>
                  <AvField
                    id="fleet-owner-country"
                    type="text"
                    name="country"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
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
                  <Label id="createdAtLabel" for="fleet-owner-createdAt">
                    Created At
                  </Label>
                  <AvInput
                    id="fleet-owner-createdAt"
                    type="datetime-local"
                    className="form-control"
                    name="createdAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.fleetOwnerEntity.createdAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updatedAtLabel" for="fleet-owner-updatedAt">
                    Updated At
                  </Label>
                  <AvInput
                    id="fleet-owner-updatedAt"
                    type="datetime-local"
                    className="form-control"
                    name="updatedAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.fleetOwnerEntity.updatedAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="fleet-owner-user">User</Label>
                  <AvInput id="fleet-owner-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="fleet-owner-turo">Turo</Label>
                  <AvInput id="fleet-owner-turo" type="select" className="form-control" name="turo.id">
                    <option value="" key="0" />
                    {turos
                      ? turos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/fleet-owner" replace color="info">
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
  users: storeState.userManagement.users,
  turos: storeState.turo.entities,
  fleetOwnerEntity: storeState.fleetOwner.entity,
  loading: storeState.fleetOwner.loading,
  updating: storeState.fleetOwner.updating,
  updateSuccess: storeState.fleetOwner.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getTuros,
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
)(FleetOwnerUpdate);
