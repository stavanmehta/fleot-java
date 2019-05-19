import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './car.reducer';
import { ICar } from 'app/shared/model/car.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICarProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Car extends React.Component<ICarProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { carList, match } = this.props;
    return (
      <div>
        <h2 id="car-heading">
          Cars
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Car
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Registration No</th>
                <th>Image</th>
                <th>Manufacturer Year</th>
                <th>Driver Id</th>
                <th>Description</th>
                <th>Age Restriction</th>
                <th>Daily Rate</th>
                <th>Hourly Rate</th>
                <th>Miles Surcharge</th>
                <th>Late Return Fee</th>
                <th>Cleaning Fee</th>
                <th>Deposit</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Cartype</th>
                <th>Fleetowner</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {carList.map((car, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${car.id}`} color="link" size="sm">
                      {car.id}
                    </Button>
                  </td>
                  <td>{car.brand}</td>
                  <td>{car.model}</td>
                  <td>{car.registrationNo}</td>
                  <td>
                    {car.image ? (
                      <div>
                        <a onClick={openFile(car.imageContentType, car.image)}>
                          <img src={`data:${car.imageContentType};base64,${car.image}`} style={{ maxHeight: '30px' }} />
                          &nbsp;
                        </a>
                        <span>
                          {car.imageContentType}, {byteSize(car.image)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{car.manufacturerYear}</td>
                  <td>{car.driverId}</td>
                  <td>{car.description}</td>
                  <td>{car.ageRestriction}</td>
                  <td>{car.dailyRate}</td>
                  <td>{car.hourlyRate}</td>
                  <td>{car.milesSurcharge}</td>
                  <td>{car.lateReturnFee}</td>
                  <td>{car.cleaningFee}</td>
                  <td>{car.deposit}</td>
                  <td>
                    <TextFormat type="date" value={car.createdAt} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={car.updatedAt} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{car.cartype ? <Link to={`car-type/${car.cartype.id}`}>{car.cartype.id}</Link> : ''}</td>
                  <td>{car.fleetowner ? <Link to={`fleet-owner/${car.fleetowner.id}`}>{car.fleetowner.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${car.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${car.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${car.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ car }: IRootState) => ({
  carList: car.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Car);
