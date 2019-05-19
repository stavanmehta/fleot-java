import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICar } from 'app/shared/model/car.model';
import { getEntities as getCars } from 'app/entities/car/car.reducer';
import { IFleetOwner } from 'app/shared/model/fleet-owner.model';
import { getEntities as getFleetOwners } from 'app/entities/fleet-owner/fleet-owner.reducer';
import { getEntity, updateEntity, createEntity, reset } from './rental.reducer';
import { IRental } from 'app/shared/model/rental.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRentalUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRentalUpdateState {
  isNew: boolean;
  carId: string;
  fleetownerId: string;
}

export class RentalUpdate extends React.Component<IRentalUpdateProps, IRentalUpdateState> {
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

  saveEntity = (event, errors, values) => {
    values.startAt = convertDateTimeToServer(values.startAt);
    values.endAat = convertDateTimeToServer(values.endAat);

    if (errors.length === 0) {
      const { rentalEntity } = this.props;
      const entity = {
        ...rentalEntity,
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
    this.props.history.push('/entity/rental');
  };

  render() {
    const { rentalEntity, cars, fleetOwners, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="fleotappApp.rental.home.createOrEditLabel">Create or edit a Rental</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : rentalEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="rental-id">ID</Label>
                    <AvInput id="rental-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="startAtLabel" for="rental-startAt">
                    Start At
                  </Label>
                  <AvInput
                    id="rental-startAt"
                    type="datetime-local"
                    className="form-control"
                    name="startAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.rentalEntity.startAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endAatLabel" for="rental-endAat">
                    End Aat
                  </Label>
                  <AvInput
                    id="rental-endAat"
                    type="datetime-local"
                    className="form-control"
                    name="endAat"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.rentalEntity.endAat)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="rental-car">Car</Label>
                  <AvInput id="rental-car" type="select" className="form-control" name="car.id">
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
                  <Label for="rental-fleetowner">Fleetowner</Label>
                  <AvInput id="rental-fleetowner" type="select" className="form-control" name="fleetowner.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/rental" replace color="info">
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
  rentalEntity: storeState.rental.entity,
  loading: storeState.rental.loading,
  updating: storeState.rental.updating,
  updateSuccess: storeState.rental.updateSuccess
});

const mapDispatchToProps = {
  getCars,
  getFleetOwners,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RentalUpdate);
