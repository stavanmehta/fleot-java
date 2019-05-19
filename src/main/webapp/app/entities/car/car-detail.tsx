import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './car.reducer';
import { ICar } from 'app/shared/model/car.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICarDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CarDetail extends React.Component<ICarDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { carEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Car [<b>{carEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="brand">Brand</span>
            </dt>
            <dd>{carEntity.brand}</dd>
            <dt>
              <span id="model">Model</span>
            </dt>
            <dd>{carEntity.model}</dd>
            <dt>
              <span id="registrationNo">Registration No</span>
            </dt>
            <dd>{carEntity.registrationNo}</dd>
            <dt>
              <span id="image">Image</span>
            </dt>
            <dd>
              {carEntity.image ? (
                <div>
                  <a onClick={openFile(carEntity.imageContentType, carEntity.image)}>
                    <img src={`data:${carEntity.imageContentType};base64,${carEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {carEntity.imageContentType}, {byteSize(carEntity.image)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="manufacturerYear">Manufacturer Year</span>
            </dt>
            <dd>{carEntity.manufacturerYear}</dd>
            <dt>
              <span id="driverId">Driver Id</span>
            </dt>
            <dd>{carEntity.driverId}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{carEntity.description}</dd>
            <dt>
              <span id="ageRestriction">Age Restriction</span>
            </dt>
            <dd>{carEntity.ageRestriction}</dd>
            <dt>
              <span id="dailyRate">Daily Rate</span>
            </dt>
            <dd>{carEntity.dailyRate}</dd>
            <dt>
              <span id="hourlyRate">Hourly Rate</span>
            </dt>
            <dd>{carEntity.hourlyRate}</dd>
            <dt>
              <span id="milesSurcharge">Miles Surcharge</span>
            </dt>
            <dd>{carEntity.milesSurcharge}</dd>
            <dt>
              <span id="lateReturnFee">Late Return Fee</span>
            </dt>
            <dd>{carEntity.lateReturnFee}</dd>
            <dt>
              <span id="cleaningFee">Cleaning Fee</span>
            </dt>
            <dd>{carEntity.cleaningFee}</dd>
            <dt>
              <span id="deposit">Deposit</span>
            </dt>
            <dd>{carEntity.deposit}</dd>
            <dt>
              <span id="createdAt">Created At</span>
            </dt>
            <dd>
              <TextFormat value={carEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updatedAt">Updated At</span>
            </dt>
            <dd>
              <TextFormat value={carEntity.updatedAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>Cartype</dt>
            <dd>{carEntity.cartype ? carEntity.cartype.id : ''}</dd>
            <dt>Fleetowner</dt>
            <dd>{carEntity.fleetowner ? carEntity.fleetowner.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/car" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/car/${carEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ car }: IRootState) => ({
  carEntity: car.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarDetail);
