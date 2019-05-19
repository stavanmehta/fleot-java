import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICarType } from 'app/shared/model/car-type.model';
import { getEntities as getCarTypes } from 'app/entities/car-type/car-type.reducer';
import { IFleetOwner } from 'app/shared/model/fleet-owner.model';
import { getEntities as getFleetOwners } from 'app/entities/fleet-owner/fleet-owner.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './car.reducer';
import { ICar } from 'app/shared/model/car.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICarUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICarUpdateState {
  isNew: boolean;
  cartypeId: string;
  fleetownerId: string;
}

export class CarUpdate extends React.Component<ICarUpdateProps, ICarUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      cartypeId: '0',
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

    this.props.getCarTypes();
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
      const { carEntity } = this.props;
      const entity = {
        ...carEntity,
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
    this.props.history.push('/entity/car');
  };

  render() {
    const { carEntity, carTypes, fleetOwners, loading, updating } = this.props;
    const { isNew } = this.state;

    const { image, imageContentType } = carEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="fleotappApp.car.home.createOrEditLabel">Create or edit a Car</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : carEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="car-id">ID</Label>
                    <AvInput id="car-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="brandLabel" for="car-brand">
                    Brand
                  </Label>
                  <AvField
                    id="car-brand"
                    type="text"
                    name="brand"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="modelLabel" for="car-model">
                    Model
                  </Label>
                  <AvField
                    id="car-model"
                    type="text"
                    name="model"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="registrationNoLabel" for="car-registrationNo">
                    Registration No
                  </Label>
                  <AvField
                    id="car-registrationNo"
                    type="text"
                    name="registrationNo"
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
                  <Label id="manufacturerYearLabel" for="car-manufacturerYear">
                    Manufacturer Year
                  </Label>
                  <AvField
                    id="car-manufacturerYear"
                    type="string"
                    className="form-control"
                    name="manufacturerYear"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="driverIdLabel" for="car-driverId">
                    Driver Id
                  </Label>
                  <AvField id="car-driverId" type="string" className="form-control" name="driverId" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="car-description">
                    Description
                  </Label>
                  <AvField id="car-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="ageRestrictionLabel" for="car-ageRestriction">
                    Age Restriction
                  </Label>
                  <AvField
                    id="car-ageRestriction"
                    type="string"
                    className="form-control"
                    name="ageRestriction"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dailyRateLabel" for="car-dailyRate">
                    Daily Rate
                  </Label>
                  <AvField
                    id="car-dailyRate"
                    type="string"
                    className="form-control"
                    name="dailyRate"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="hourlyRateLabel" for="car-hourlyRate">
                    Hourly Rate
                  </Label>
                  <AvField id="car-hourlyRate" type="string" className="form-control" name="hourlyRate" />
                </AvGroup>
                <AvGroup>
                  <Label id="milesSurchargeLabel" for="car-milesSurcharge">
                    Miles Surcharge
                  </Label>
                  <AvField id="car-milesSurcharge" type="string" className="form-control" name="milesSurcharge" />
                </AvGroup>
                <AvGroup>
                  <Label id="lateReturnFeeLabel" for="car-lateReturnFee">
                    Late Return Fee
                  </Label>
                  <AvField id="car-lateReturnFee" type="string" className="form-control" name="lateReturnFee" />
                </AvGroup>
                <AvGroup>
                  <Label id="cleaningFeeLabel" for="car-cleaningFee">
                    Cleaning Fee
                  </Label>
                  <AvField id="car-cleaningFee" type="string" className="form-control" name="cleaningFee" />
                </AvGroup>
                <AvGroup>
                  <Label id="depositLabel" for="car-deposit">
                    Deposit
                  </Label>
                  <AvField id="car-deposit" type="string" className="form-control" name="deposit" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdAtLabel" for="car-createdAt">
                    Created At
                  </Label>
                  <AvInput
                    id="car-createdAt"
                    type="datetime-local"
                    className="form-control"
                    name="createdAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.carEntity.createdAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updatedAtLabel" for="car-updatedAt">
                    Updated At
                  </Label>
                  <AvInput
                    id="car-updatedAt"
                    type="datetime-local"
                    className="form-control"
                    name="updatedAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.carEntity.updatedAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="car-cartype">Cartype</Label>
                  <AvInput id="car-cartype" type="select" className="form-control" name="cartype.id">
                    <option value="" key="0" />
                    {carTypes
                      ? carTypes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="car-fleetowner">Fleetowner</Label>
                  <AvInput id="car-fleetowner" type="select" className="form-control" name="fleetowner.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/car" replace color="info">
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
  carTypes: storeState.carType.entities,
  fleetOwners: storeState.fleetOwner.entities,
  carEntity: storeState.car.entity,
  loading: storeState.car.loading,
  updating: storeState.car.updating,
  updateSuccess: storeState.car.updateSuccess
});

const mapDispatchToProps = {
  getCarTypes,
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
)(CarUpdate);
