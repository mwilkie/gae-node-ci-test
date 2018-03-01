import { func, number, oneOf, string } from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import React, { PureComponent } from 'react';
import { clearNotification } from '../../actions/notifications';
import Button from '../Button';
import './index.scss';

export class Notification extends PureComponent {
  constructor(props) {
    super(props);
    this.clearNotification = this.clearNotification.bind(this);
  }

  componentDidMount() {
    this._timeout = window.setTimeout(
      () => this.props.clearNotification(this.props.id),
      2000
    );
  }

  componentWillUnmount() {
    window.clearTimeout(this._timeout);
  }

  clearNotification(e) {
    e.preventDefault();
    this.props.clearNotification(this.props.id);
  }

  render() {
    return (
      <div
        className={classnames(
          'Notification',
          `Notification--${this.props.type}`
        )}
      >
        <div className="Notification__close">
          <Button size="small" onClick={this.clearNotification}>
            x
          </Button>
        </div>
        <div className="Notification__content">{this.props.content}</div>
      </div>
    );
  }
}

Notification.propTypes = {
  clearNotification: func.isRequired,
  content: string.isRequired,
  id: number.isRequired,
  type: oneOf(['success', 'error'])
};

Notification.defaultProps = {
  type: 'success'
};

export default connect(null, dispatch => ({
  clearNotification(id) {
    dispatch(clearNotification(id));
  }
}))(Notification);
