import { shallow } from 'enzyme';
import React from 'react';
import UrlForm from './index';

function setup(overrides) {
  const defaultProps = {};
  const props = { ...defaultProps, ...overrides };
  const wrapper = shallow(<UrlForm {...props} />);
  return {
    wrapper,
    props
  };
}

describe('<UrlForm>', () => {
  it('should render', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });

  it('should render an <Input>', () => {
    const { wrapper } = setup();
    expect(wrapper.find('Input').exists()).toBe(true);
  });

  describe('handleChange', () => {
    it('should set the correct state with a valid url', () => {
      const { wrapper } = setup();
      const target = {
        value: 'a',
        validity: {
          typeMismatch: false
        }
      };
      wrapper.instance().handleChange(target);
      expect(wrapper.state('url')).toEqual('a');
      expect(wrapper.state('isUrlValid')).toEqual(true);
    });

    it('should set the correct state with an invalid url', () => {
      const { wrapper } = setup();
      const target = {
        value: 'a',
        validity: {
          typeMismatch: true
        }
      };
      wrapper.instance().handleChange(target);
      expect(wrapper.state('url')).toEqual('a');
      expect(wrapper.state('isUrlValid')).toEqual(false);
    });
  });

  describe('handleClick', () => {});
});
