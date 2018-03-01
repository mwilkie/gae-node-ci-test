import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { func } from 'prop-types';
import { Component } from 'react';

const MUTATION = gql`
  mutation resource($url: String!) {
    resource(url: $url) {
      url
    }
  }
`;

class ResourceMutation extends Component {
  constructor(props) {
    super(props);
    this.updateResource = this.updateResource.bind(this);
  }

  updateResource(variables) {
    return this.props.updateResource({ variables });
  }

  render() {
    return this.props.children(this.updateResource);
  }
}

ResourceMutation.propTypes = {
  children: func.isRequired,
  updateResource: func.isRequired
};

export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    updateResource: mutate
  })
})(ResourceMutation);
