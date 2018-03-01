import { objectOf, shape, string } from 'prop-types';
import React from 'react';
import { withRouter } from 'next/router';
import Page from '../../components/Page';
import ContextQueueQuery from '../../components/ContextQueueQuery';
import ContextQueueList from '../../components/ContextQueueList';
import QueueStatusFilter from '../../components/QueueStatusFilter';
import withData from '../../lib/withData';

const QueueStatusFilterWithRouter = withRouter(QueueStatusFilter);

function ModerateFeed({ url: { query } }) {
  const activeItem = query.status || 'pending';

  return (
    <Page title="Moderate Feed">
      <div>
        <h1>Moderate {query.context} Feed</h1>
        <QueueStatusFilterWithRouter />
        <ContextQueueQuery context={query.context} queueStatus={activeItem}>
          {({ queue, loading }) =>
            !queue || loading ? (
              'Loading...'
            ) : (
              <ContextQueueList queue={queue} context={query.context} />
            )
          }
        </ContextQueueQuery>
      </div>
    </Page>
  );
}

ModerateFeed.propTypes = {
  url: shape({ query: objectOf(string) })
};

ModerateFeed.defaultProps = {
  url: {
    query: {}
  }
};

export default withData(ModerateFeed);
