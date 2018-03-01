import { shallow } from 'enzyme';
import React from 'react';
import Textarea from './index';

function setup(overrides) {
  const defaultProps = {
    name: 'name',
    placeholder: 'name',
    value: 'test',
    onChange: jest.fn()
  };
  const props = { ...defaultProps, ...overrides };
  const wrapper = shallow(<Textarea {...props} />);
  return {
    wrapper,
    props
  };
}

describe('<Textarea>', () => {
  it('should render', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });

  it('should call props.onChange with the correct arguments', () => {
    const { wrapper, props } = setup();
    const target = {};
    wrapper.find('textarea').simulate('change', { target });
    expect(props.onChange).toHaveBeenCalledWith(target);
  });
});
