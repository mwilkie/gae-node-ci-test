import { shallow } from 'enzyme';
import React from 'react';
import Global from './index';

describe('<Global>', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Global>
        <div />
      </Global>
    );
    expect(wrapper.exists()).toBe(true);
  });
  it('should render children', () => {
    const child = <div />;
    const wrapper = shallow(<Global>{child}</Global>);
    expect(wrapper.contains(child)).toBe(true);
  });
});
