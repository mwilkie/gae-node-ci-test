import { arrayOf, func, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import React, { Component } from 'react';
import Router from 'next/router';
import { showNotification } from '../../actions/notifications';
import Button from '../Button';
import InputGroup from '../InputGroup';
import ResourceMutation from '../ResourceMutation';
import './index.scss';

// Mapping to convert record names to friendly labels
// Note, the mapping is quite simple now, but it might
// become more complex...
const FIELD_LABELS = {
  title: 'Title',
  description: 'Description',
  image: 'Image'
};

export class MetadataForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: props.resource,
      isRequestPending: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  handleChange(context) {
    return ({ name, value }) =>
      this.setState(({ resource }) => {
        const metadata = resource.metadata.map(data => {
          if (data.context === context) {
            return {
              context,
              records: data.records.map(record => {
                if (record.name === name) {
                  return { name, value };
                }
                return record;
              })
            };
          }
          return data;
        });
        return { resource: { ...resource, metadata } };
      });
  }

  handleSuccess() {
    this.setState({ isRequestPending: false }, () => {
      this.props.onSuccess();
      this.props.showNotification({
        type: 'success',
        content: 'Metadata has been updated!'
      });
    });
  }

  handleError() {
    this.setState({ isRequestPending: false }, () => {
      this.props.showNotification({
        type: 'error',
        content: 'Something went wrong. Please try again.'
      });
    });
  }

  handleSubmit(updateResource) {
    return e => {
      e.preventDefault();
      this.setState({ isRequestPending: true }, () =>
        updateResource({ ...this.state.resource }).then(
          this.handleSuccess,
          this.handleError
        )
      );
    };
  }

  render() {
    const { resource: { url, metadata }, isRequestPending } = this.state;
    return (
      <div className="MetadataForm">
        <h1>
          <Link href={url}>
            <a target="_blank" rel="noopener">
              {url}
            </a>
          </Link>
        </h1>
        <form disabled={isRequestPending}>
          <div className="MetadataForm__fields">
            {metadata
              .filter(
                ({ context }) =>
                  this.props.context ? context === this.props.context : true
              )
              .map(data => (
                <InputGroup
                  key={data.context}
                  onChange={this.handleChange(data.context)}
                  heading={data.context}
                  fields={data.records.map(r =>
                    Object.assign({}, r, { label: FIELD_LABELS[r.name] })
                  )}
                />
              ))}
          </div>
          <div className="MetadataForm__actions">
            <div className="MetadataForm__action-item">
              <ResourceMutation>
                {updateResource => (
                  <Button
                    type="submit"
                    onClick={this.handleSubmit(updateResource)}
                    disabled={isRequestPending}
                  >
                    Save
                  </Button>
                )}
              </ResourceMutation>
            </div>
            <div className="MetadataForm__action-item">
              <Button onClick={this.props.handleCancel}>Cancel</Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

MetadataForm.propTypes = {
  handleCancel: func,
  onSuccess: func,
  resource: shape({
    url: string,
    metadata: arrayOf(
      shape({
        context: string,
        records: arrayOf(
          shape({
            name: string,
            value: string
          })
        )
      })
    )
  }).isRequired,
  context: string,
  showNotification: func.isRequired
};

MetadataForm.defaultProps = {
  handleCancel: e => {
    e.preventDefault();
    Router.push('/metadata/update');
  },
  onSuccess: () => {},
  context: undefined
};

export default connect(null, dispatch => ({
  showNotification(data) {
    dispatch(showNotification(data));
  }
}))(MetadataForm);
