import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './rental.reducer';
import { IRental } from 'app/shared/model/rental.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRentalDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RentalDetail extends React.Component<IRentalDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { rentalEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Rental [<b>{rentalEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="startAt">Start At</span>
            </dt>
            <dd>
              <TextFormat value={rentalEntity.startAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endAat">End Aat</span>
            </dt>
            <dd>
              <TextFormat value={rentalEntity.endAat} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>Car</dt>
            <dd>{rentalEntity.car ? rentalEntity.car.id : ''}</dd>
            <dt>Fleetowner</dt>
            <dd>{rentalEntity.fleetowner ? rentalEntity.fleetowner.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/rental" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/rental/${rentalEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ rental }: IRootState) => ({
  rentalEntity: rental.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RentalDetail);
