import { shallow } from 'enzyme';
import React from 'react';
import Notification from '../Notification';
import { Page } from './index';

function setup(overrides) {
  const defaultProps = {
    notifications: []
  };
  const props = { ...defaultProps, ...overrides };
  const wrapper = shallow(
    <Page {...props}>
      <div>this is a page</div>
    </Page>
  );
  return {
    wrapper,
    props
  };
}

describe('<Page>', () => {
  it('should render', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });

  it('renders notifications', () => {
    const { wrapper } = setup({
      notifications: [{ id: 1 }, { id: 2 }, { id: 3 }]
    });
    expect(wrapper.find(Notification).length).toEqual(3);
  });
});
