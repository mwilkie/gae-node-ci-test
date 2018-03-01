import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const QUERY = gql`
  query resource($url: String!) {
    resource(url: $url) {
      url
      metadata {
        context
        records {
          name
          value
        }
      }
    }
  }
`;

const ResourceQuery = ({ children, data }) => children(data);

export default graphql(QUERY, {
  options: ({ url }) => ({ variables: { url } })
})(ResourceQuery);
