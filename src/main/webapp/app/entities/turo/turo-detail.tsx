import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './turo.reducer';
import { ITuro } from 'app/shared/model/turo.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITuroDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TuroDetail extends React.Component<ITuroDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { turoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Turo [<b>{turoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="turoId">Turo Id</span>
            </dt>
            <dd>{turoEntity.turoId}</dd>
          </dl>
          <Button tag={Link} to="/entity/turo" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/turo/${turoEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ turo }: IRootState) => ({
  turoEntity: turo.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TuroDetail);
