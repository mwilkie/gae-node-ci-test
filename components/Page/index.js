import { arrayOf, element, number, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import Head from 'next/head';
import Global from '../Global';
import Header from '../Header';
import Notification from '../Notification';
import './index.scss';

export function Page({ children, notifications, title }) {
  return (
    <Global>
      <div className="Page">
        <Head>
          <title>{`Workflow - ${title}`}</title>
        </Head>
        <Header />
        <main>{children}</main>
        {notifications.length > 0 && (
          <div className="Page__notifications">
            {notifications.map(notification => (
              <Notification key={notification.id} {...notification} />
            ))}
          </div>
        )}
      </div>
    </Global>
  );
}

Page.propTypes = {
  children: element.isRequired,
  notifications: arrayOf(
    shape({
      id: number,
      content: string
    })
  ).isRequired,
  title: string
};

Page.defaultProps = {
  title: 'TBD'
};

export default connect(({ notifications }) => ({ notifications }))(Page);
