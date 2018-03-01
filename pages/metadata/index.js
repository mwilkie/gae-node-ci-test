import React from 'react';
import Link from 'next/link';
import Page from '../../components/Page';
import withData from '../../lib/withData';

export default withData(() => (
  <Page title="Metadata">
    <div>
      <h1>Metadata</h1>
      <ul>
        <li>
          <Link href="/metadata/update">
            <a>Optimize</a>
          </Link>
        </li>
      </ul>
    </div>
  </Page>
));
