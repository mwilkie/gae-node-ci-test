import { shallow } from 'enzyme';
import React from 'react';
import QueueStatusFilter from './index';

function setup(overrides) {
  const defaultProps = {
    router: {
      query: {
        context: 'flipboard'
      }
    }
  };
  const props = { ...defaultProps, ...overrides };
  const wrapper = shallow(<QueueStatusFilter {...props} />);
  return {
    wrapper,
    props
  };
}

describe('<QueueStatusFilter>', () => {
  it('should render', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });
});
