import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './fleet-owner.reducer';
import { IFleetOwner } from 'app/shared/model/fleet-owner.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFleetOwnerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FleetOwnerDetail extends React.Component<IFleetOwnerDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { fleetOwnerEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            FleetOwner [<b>{fleetOwnerEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="companyName">Company Name</span>
            </dt>
            <dd>{fleetOwnerEntity.companyName}</dd>
            <dt>
              <span id="gender">Gender</span>
            </dt>
            <dd>{fleetOwnerEntity.gender}</dd>
            <dt>
              <span id="phone">Phone</span>
            </dt>
            <dd>{fleetOwnerEntity.phone}</dd>
            <dt>
              <span id="addressLine1">Address Line 1</span>
            </dt>
            <dd>{fleetOwnerEntity.addressLine1}</dd>
            <dt>
              <span id="addressLine2">Address Line 2</span>
            </dt>
            <dd>{fleetOwnerEntity.addressLine2}</dd>
            <dt>
              <span id="city">City</span>
            </dt>
            <dd>{fleetOwnerEntity.city}</dd>
            <dt>
              <span id="country">Country</span>
            </dt>
            <dd>{fleetOwnerEntity.country}</dd>
            <dt>
              <span id="image">Image</span>
            </dt>
            <dd>
              {fleetOwnerEntity.image ? (
                <div>
                  <a onClick={openFile(fleetOwnerEntity.imageContentType, fleetOwnerEntity.image)}>
                    <img src={`data:${fleetOwnerEntity.imageContentType};base64,${fleetOwnerEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {fleetOwnerEntity.imageContentType}, {byteSize(fleetOwnerEntity.image)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="createdAt">Created At</span>
            </dt>
            <dd>
              <TextFormat value={fleetOwnerEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updatedAt">Updated At</span>
            </dt>
            <dd>
              <TextFormat value={fleetOwnerEntity.updatedAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>User</dt>
            <dd>{fleetOwnerEntity.user ? fleetOwnerEntity.user.id : ''}</dd>
            <dt>Turo</dt>
            <dd>{fleetOwnerEntity.turo ? fleetOwnerEntity.turo.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/fleet-owner" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/fleet-owner/${fleetOwnerEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ fleetOwner }: IRootState) => ({
  fleetOwnerEntity: fleetOwner.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FleetOwnerDetail);
