import React, { Component } from 'react';
import { shape, string, number } from 'prop-types';
import format from 'date-fns/format';
import Button from '../Button';
import MetadataForm from '../MetadataForm';
import Modal from '../Modal';
import ResourceQuery from '../ResourceQuery';
import './index.scss';

function formatDate(timestamp) {
  return format(new Date(timestamp), 'MMM D, YYYY H:mma');
}

class QueueItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  renderModal() {
    return (
      <Modal
        contentLabel="Metadata"
        isOpen={this.state.isModalOpen}
        onClose={this.closeModal}
      >
        <ResourceQuery url={this.props.item.url}>
          {({ resource, loading }) =>
            !resource || loading ? (
              'Loading...'
            ) : (
              <MetadataForm
                resource={resource}
                context={this.props.router.query.context}
                onSuccess={this.closeModal}
                handleCancel={e => {
                  e.preventDefault();
                  this.closeModal();
                }}
              />
            )
          }
        </ResourceQuery>
      </Modal>
    );
  }

  render() {
    const {
      item: {
        title,
        description,
        imageUrl,
        queueStatus,
        publishedAt,
        approvedAt,
        rejectedAt
      },
      router
    } = this.props;
    const statusFilter = router.query.status;
    const isPendingQueue = !statusFilter || statusFilter === 'pending';
    return (
      <div className="QueueItem">
        {isPendingQueue && (
          <header className="QueueItem__header">
            <Button data-type="reject">Reject</Button>
            <Button data-type="optimize" onClick={this.openModal}>
              Optimize
            </Button>
            <Button data-type="release">
              Release to {router.query.context}
            </Button>
          </header>
        )}
        <div className="QueueItem__wrap">
          <div className="QueueItem__image">
            <img src={imageUrl} alt={title} />
          </div>
          <div className="QueueItem__content">
            <h2 className="QueueItem__title">{title}</h2>
            <div className="QueueItem__description">{description}</div>
            <div className="QueueItem__published_date">
              <strong>Published:</strong> {formatDate(publishedAt)}
            </div>
          </div>
        </div>
        <div className="QueueItem__status">
          Queue Status: {queueStatus} {approvedAt && formatDate(approvedAt)}{' '}
          {rejectedAt && formatDate(rejectedAt)}
        </div>
        {this.state.isModalOpen && this.renderModal()}
      </div>
    );
  }
}

QueueItem.propTypes = {
  item: shape({
    id: number.isRequired,
    title: string.isRequired,
    description: string.isRequired,
    url: string.isRequired,
    imageUrl: string.isRequired,
    queueStatus: string.isRequired,
    publishedAt: string.isRequired,
    approvedAt: string,
    rejectedAt: string
  }).isRequired,
  router: shape({
    query: shape({
      context: string.isRequired,
      status: string
    })
  }).isRequired
};

export default QueueItem;
