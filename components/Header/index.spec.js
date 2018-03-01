import { shallow } from 'enzyme';
import React from 'react';
import Header from './index';

describe('<Header>', () => {
  it('should render', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists()).toBe(true);
  });
});
