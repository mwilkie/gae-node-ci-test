import { mount } from 'enzyme';
import React from 'react';
import QueueItem from './index';

jest.mock('../ResourceQuery', () => ({ children }) =>
  children(jest.fn(() => ({ then: jest.fn() })))
);

function setup(overrides) {
  const defaultProps = {
    item: {
      id: 0,
      title: 'this is the title',
      description: 'this is the description',
      imageUrl: '//placeholder.com/130x130',
      url: 'thekitchn.com/wut',
      queueStatus: 'pending'
    },
    router: {
      query: { context: 'flipboard' }
    },
    onOptimize: jest.fn()
  };
  const props = { ...defaultProps, ...overrides };
  const wrapper = mount(<QueueItem {...props} />);
  return {
    wrapper,
    props
  };
}

describe('<QueueItem>', () => {
  it('should render', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });

  it('should set state.isModalOpen to true when optimize is clicked', () => {
    const { wrapper } = setup();
    wrapper
      .find('[data-type="optimize"]')
      .filter('Button')
      .simulate('click');
    expect(wrapper.state('isModalOpen')).toEqual(true);
  });

  it('should render the modal when state.isModalOpen is true', () => {
    const { wrapper } = setup();
    expect(wrapper.find('Modal').exists()).toBe(false);
    wrapper.setState({ isModalOpen: true });
    expect(wrapper.find('Modal').exists()).toBe(true);
  });
});
