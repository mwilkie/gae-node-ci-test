import { shallow } from 'enzyme';
import React from 'react';
import Button from './index';

function setup(overrides) {
  const defaultProps = {
    onClick: jest.fn()
  };
  const props = { ...defaultProps, ...overrides };
  const wrapper = shallow(<Button {...props} />);
  return {
    wrapper,
    props
  };
}

describe('<Button>', () => {
  it('should render', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });

  it('should call props.onClick', () => {
    const { wrapper, props } = setup();
    wrapper.simulate('click');
    expect(props.onClick).toHaveBeenCalled();
  });
});
