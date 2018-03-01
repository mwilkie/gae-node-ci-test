import { Component } from 'react';
import { func, string } from 'prop-types';
import data from './data';

const QUEUES = data;

class ContextQueueQuery extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      queue: null
    };

    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    setTimeout(this.loadData, 1000);
  }

  componentWillReceiveProps({ queueStatus }) {
    if (queueStatus !== this.props.queueStatus) {
      this.loadData(queueStatus);
    }
  }

  loadData(status) {
    const queueStatus = status || this.props.queueStatus;
    this.setState({
      loading: false,
      queue: QUEUES[this.props.context].filter(
        item => item.queueStatus === queueStatus
      )
    });
  }

  render() {
    return this.props.children(this.state);
  }
}

ContextQueueQuery.propTypes = {
  children: func.isRequired,
  context: string.isRequired
};

export default ContextQueueQuery;
