import { objectOf, shape, string } from 'prop-types';
import React from 'react';
import MetadataForm from '../../components/MetadataForm';
import Page from '../../components/Page';
import ResourceQuery from '../../components/ResourceQuery';
import UrlForm from '../../components/UrlForm';
import withData from '../../lib/withData';

function UpdatePage({ url: { query } }) {
  return (
    <Page title="Metadata">
      {query.resource ? (
        <ResourceQuery url={decodeURIComponent(query.resource)}>
          {({ resource, loading }) =>
            !resource || loading ? (
              'Loading...'
            ) : (
              <MetadataForm resource={resource} />
            )
          }
        </ResourceQuery>
      ) : (
        <UrlForm />
      )}
    </Page>
  );
}

UpdatePage.propTypes = {
  url: shape({ query: objectOf(string) })
};

UpdatePage.defaultProps = {
  url: {
    query: {}
  }
};

export default withData(UpdatePage);
