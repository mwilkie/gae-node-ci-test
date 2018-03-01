import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { string, shape } from 'prop-types';
import './index.scss';

function QueueStatusFilter({ router: { query } }) {
  const { context, status = 'pending' } = query;
  return (
    <div className="QueueStatusFilter">
      {['pending', 'approved', 'rejected'].map(item => (
        <span
          key={item}
          className={classnames({
            'QueueStatusFilter__item': true,
            'QueueStatusFilter__item--active': status === item
          })}
        >
          <Link
            href={{
              pathname: `/feeds/context`,
              query: {
                context,
                status: item
              }
            }}
            as={`/feeds/${context}`}
          >
            <a>{item}</a>
          </Link>
        </span>
      ))}
    </div>
  );
}

QueueStatusFilter.propTypes = {
  router: shape({
    query: shape({
      context: string.isRequired,
      status: string
    })
  }).isRequired
};

export default QueueStatusFilter;
