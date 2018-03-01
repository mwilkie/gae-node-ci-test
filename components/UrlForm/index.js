import Link from 'next/link';
import React, { Component } from 'react';
import Button from '../Button';
import Input from '../Input';
import './index.scss';

class UrlForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isUrlValid: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ value, validity }) {
    this.setState({
      url: value,
      isUrlValid: !validity.typeMismatch
    });
  }

  render() {
    const { isUrlValid, url } = this.state;
    const encodedUrl = encodeURIComponent(url);
    return (
      <div className="UrlForm">
        <Input
          type="url"
          name="url"
          placeholder="Enter Url..."
          value={url}
          onChange={this.handleChange}
          required
        />
        <div>
          <Link
            href={`/metadata/update?resource=${encodedUrl}`}
            as={`/metadata/update/${encodedUrl}`}
          >
            <Button>Optimize</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default UrlForm;
