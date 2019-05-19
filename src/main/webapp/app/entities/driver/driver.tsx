import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './driver.reducer';
import { IDriver } from 'app/shared/model/driver.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDriverProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Driver extends React.Component<IDriverProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { driverList, match } = this.props;
    return (
      <div>
        <h2 id="driver-heading">
          Drivers
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Driver
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Address Line 1</th>
                <th>Address Line 2</th>
                <th>City</th>
                <th>Country</th>
                <th>License No</th>
                <th>License Image</th>
                <th>Nid</th>
                <th>Nid Image</th>
                <th>Image</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Car</th>
                <th>Fleetowner</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {driverList.map((driver, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${driver.id}`} color="link" size="sm">
                      {driver.id}
                    </Button>
                  </td>
                  <td>{driver.firstName}</td>
                  <td>{driver.lastName}</td>
                  <td>{driver.email}</td>
                  <td>{driver.gender}</td>
                  <td>{driver.phone}</td>
                  <td>{driver.addressLine1}</td>
                  <td>{driver.addressLine2}</td>
                  <td>{driver.city}</td>
                  <td>{driver.country}</td>
                  <td>{driver.licenseNo}</td>
                  <td>
                    {driver.licenseImage ? (
                      <div>
                        <a onClick={openFile(driver.licenseImageContentType, driver.licenseImage)}>
                          <img src={`data:${driver.licenseImageContentType};base64,${driver.licenseImage}`} style={{ maxHeight: '30px' }} />
                          &nbsp;
                        </a>
                        <span>
                          {driver.licenseImageContentType}, {byteSize(driver.licenseImage)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{driver.nid}</td>
                  <td>
                    {driver.nidImage ? (
                      <div>
                        <a onClick={openFile(driver.nidImageContentType, driver.nidImage)}>
                          <img src={`data:${driver.nidImageContentType};base64,${driver.nidImage}`} style={{ maxHeight: '30px' }} />
                          &nbsp;
                        </a>
                        <span>
                          {driver.nidImageContentType}, {byteSize(driver.nidImage)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {driver.image ? (
                      <div>
                        <a onClick={openFile(driver.imageContentType, driver.image)}>
                          <img src={`data:${driver.imageContentType};base64,${driver.image}`} style={{ maxHeight: '30px' }} />
                          &nbsp;
                        </a>
                        <span>
                          {driver.imageContentType}, {byteSize(driver.image)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    <TextFormat type="date" value={driver.createdAt} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={driver.updatedAt} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{driver.car ? <Link to={`car/${driver.car.id}`}>{driver.car.id}</Link> : ''}</td>
                  <td>{driver.fleetowner ? <Link to={`fleet-owner/${driver.fleetowner.id}`}>{driver.fleetowner.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${driver.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${driver.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${driver.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ driver }: IRootState) => ({
  driverList: driver.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Driver);
