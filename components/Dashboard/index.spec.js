import { shallow } from 'enzyme';
import React from 'react';
import Dashboard from './index';

describe('<Dashboard>', () => {
  it('should render', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.exists()).toBe(true);
  });
});
