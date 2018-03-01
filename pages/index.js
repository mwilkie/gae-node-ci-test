import React from 'react';
import Dashboard from '../components/Dashboard';
import Page from '../components/Page';
import withData from '../lib/withData';

export default withData(() => (
  <Page title="Dashboard">
    <Dashboard />
  </Page>
));
