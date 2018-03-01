import React from 'react';
import Link from 'next/link';
import Page from '../../components/Page';
import withData from '../../lib/withData';

function Feeds() {
  return (
    <Page title="Feeds">
      <div>
        <h1>Feeds</h1>
        <ul>
          <li>
            <Link href="/feeds/context?context=flipboard" as="/feeds/flipboard">
              <a>Flipboard</a>
            </Link>
          </li>
        </ul>
      </div>
    </Page>
  );
}

export default withData(Feeds);
