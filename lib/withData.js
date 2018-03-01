import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { Provider } from 'react-redux';
import Head from 'next/head';
import initApollo from './initApollo';
import initRedux from './initRedux';

// Get the display name of a JSX component for dev tools
function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown';
}

export default ComposedComponent =>
  class WithData extends React.Component {
    static displayName = `WithData(${getComponentDisplayName(
      ComposedComponent
    )})`;

    static propTypes = {
      serverState: PropTypes.object.isRequired // eslint-disable-line
    };

    static async getInitialProps(ctx) {
      // Initial serverState with apollo (empty)
      let serverState = {
        apollo: {
          data: {}
        }
      };
      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }
      // Run all GraphQL queries in the component tree and extract the resulting data
      if (!process.browser) {
        const apollo = initApollo();
        const redux = initRedux();

        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <ApolloProvider client={apollo}>
              <Provider store={redux}>
                <ComposedComponent {...composedInitialProps} />
              </Provider>
            </ApolloProvider>,
            {
              router: {
                asPath: ctx.asPath,
                pathname: ctx.pathname,
                query: ctx.query
              }
            }
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
        }
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
        // Extract query data from the Apollo store
        serverState = {
          apollo: {
            data: apollo.cache.extract()
          },
          ...redux.getState()
        };
      }

      return {
        serverState,
        ...composedInitialProps
      };
    }

    constructor(props) {
      super(props);
      const { apollo, ...reduxState } = this.props.serverState;
      this.apollo = initApollo(apollo.data);
      this.redux = initRedux(reduxState);
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <Provider store={this.redux}>
            <ComposedComponent {...this.props} />
          </Provider>
        </ApolloProvider>
      );
    }
  };
