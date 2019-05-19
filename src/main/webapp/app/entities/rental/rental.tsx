import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './rental.reducer';
import { IRental } from 'app/shared/model/rental.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRentalProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Rental extends React.Component<IRentalProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { rentalList, match } = this.props;
    return (
      <div>
        <h2 id="rental-heading">
          Rentals
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Rental
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Start At</th>
                <th>End Aat</th>
                <th>Car</th>
                <th>Fleetowner</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rentalList.map((rental, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${rental.id}`} color="link" size="sm">
                      {rental.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={rental.startAt} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={rental.endAat} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{rental.car ? <Link to={`car/${rental.car.id}`}>{rental.car.id}</Link> : ''}</td>
                  <td>{rental.fleetowner ? <Link to={`fleet-owner/${rental.fleetowner.id}`}>{rental.fleetowner.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${rental.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${rental.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${rental.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ rental }: IRootState) => ({
  rentalList: rental.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rental);
