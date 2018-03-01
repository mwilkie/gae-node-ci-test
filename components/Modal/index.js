import { bool, element, func, string } from 'prop-types';
import ReactModal from 'react-modal';
import React, { Component } from 'react';
import Button from '../Button';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen
    };
    this.close = this.close.bind(this);
  }

  componentWillMount() {
    ReactModal.setAppElement('body');
  }

  close() {
    this.setState({ isOpen: false }, this.props.onClose);
  }

  render() {
    return (
      <ReactModal
        isOpen={this.state.isOpen}
        onRequestClose={this.close}
        contentLabel={this.props.contentLabel}
      >
        <Button onClick={this.close}>x</Button>
        {this.props.children}
      </ReactModal>
    );
  }
}

Modal.propTypes = {
  children: element.isRequired,
  contentLabel: string.isRequired,
  isOpen: bool,
  onClose: func.isRequired
};

Modal.defaultProps = {
  isOpen: false
};

export default Modal;
