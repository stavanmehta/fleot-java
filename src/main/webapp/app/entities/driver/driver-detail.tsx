import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './driver.reducer';
import { IDriver } from 'app/shared/model/driver.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDriverDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DriverDetail extends React.Component<IDriverDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { driverEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Driver [<b>{driverEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="firstName">First Name</span>
            </dt>
            <dd>{driverEntity.firstName}</dd>
            <dt>
              <span id="lastName">Last Name</span>
            </dt>
            <dd>{driverEntity.lastName}</dd>
            <dt>
              <span id="email">Email</span>
            </dt>
            <dd>{driverEntity.email}</dd>
            <dt>
              <span id="gender">Gender</span>
            </dt>
            <dd>{driverEntity.gender}</dd>
            <dt>
              <span id="phone">Phone</span>
            </dt>
            <dd>{driverEntity.phone}</dd>
            <dt>
              <span id="addressLine1">Address Line 1</span>
            </dt>
            <dd>{driverEntity.addressLine1}</dd>
            <dt>
              <span id="addressLine2">Address Line 2</span>
            </dt>
            <dd>{driverEntity.addressLine2}</dd>
            <dt>
              <span id="city">City</span>
            </dt>
            <dd>{driverEntity.city}</dd>
            <dt>
              <span id="country">Country</span>
            </dt>
            <dd>{driverEntity.country}</dd>
            <dt>
              <span id="licenseNo">License No</span>
            </dt>
            <dd>{driverEntity.licenseNo}</dd>
            <dt>
              <span id="licenseImage">License Image</span>
            </dt>
            <dd>
              {driverEntity.licenseImage ? (
                <div>
                  <a onClick={openFile(driverEntity.licenseImageContentType, driverEntity.licenseImage)}>
                    <img
                      src={`data:${driverEntity.licenseImageContentType};base64,${driverEntity.licenseImage}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {driverEntity.licenseImageContentType}, {byteSize(driverEntity.licenseImage)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="nid">Nid</span>
            </dt>
            <dd>{driverEntity.nid}</dd>
            <dt>
              <span id="nidImage">Nid Image</span>
            </dt>
            <dd>
              {driverEntity.nidImage ? (
                <div>
                  <a onClick={openFile(driverEntity.nidImageContentType, driverEntity.nidImage)}>
                    <img src={`data:${driverEntity.nidImageContentType};base64,${driverEntity.nidImage}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {driverEntity.nidImageContentType}, {byteSize(driverEntity.nidImage)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="image">Image</span>
            </dt>
            <dd>
              {driverEntity.image ? (
                <div>
                  <a onClick={openFile(driverEntity.imageContentType, driverEntity.image)}>
                    <img src={`data:${driverEntity.imageContentType};base64,${driverEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {driverEntity.imageContentType}, {byteSize(driverEntity.image)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="createdAt">Created At</span>
            </dt>
            <dd>
              <TextFormat value={driverEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updatedAt">Updated At</span>
            </dt>
            <dd>
              <TextFormat value={driverEntity.updatedAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>Car</dt>
            <dd>{driverEntity.car ? driverEntity.car.id : ''}</dd>
            <dt>Fleetowner</dt>
            <dd>{driverEntity.fleetowner ? driverEntity.fleetowner.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/driver" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/driver/${driverEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ driver }: IRootState) => ({
  driverEntity: driver.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriverDetail);
