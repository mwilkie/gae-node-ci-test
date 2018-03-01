import { arrayOf, number, shape, string } from 'prop-types';
import React from 'react';
import { withRouter } from 'next/router';
import QueueItem from '../../components/QueueItem';
import './index.scss';

const QueueItemWithRouter = withRouter(QueueItem);

function ContextQueueList({ queue }) {
  return (
    <ul className="ContextQueueList">
      {queue.map(item => (
        <li key={item.id} className="ContextQueue__list-item">
          <QueueItemWithRouter item={item} />
        </li>
      ))}
    </ul>
  );
}

ContextQueueList.propTypes = {
  queue: arrayOf(
    shape({
      id: number
    })
  ).isRequired,
  context: string.isRequired
};

export default ContextQueueList;
