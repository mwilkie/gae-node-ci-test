import { mount } from 'enzyme';
import React from 'react';
import { MetadataForm } from './index';

jest.mock('../ResourceMutation', () => ({ children }) =>
  children(jest.fn(() => ({ then: jest.fn() })))
);

jest.mock('next/router', () => ({
  push: jest.fn()
}));

const mockUpdate = jest.fn(() => ({ then: jest.fn(cb => cb()) }));

function setup(overrides) {
  const defaultProps = {
    handleCancel: jest.fn(),
    onSuccess: jest.fn(),
    resource: {
      url: '/some-cool-url',
      metadata: [
        {
          context: 'a',
          records: [
            {
              name: 'a one',
              value: 'something'
            },
            {
              name: 'a two',
              value: 'something else'
            }
          ]
        },
        {
          context: 'b',
          records: [
            {
              name: 'b one',
              value: 'another value'
            }
          ]
        }
      ]
    },
    showNotification: jest.fn()
  };
  const props = { ...defaultProps, ...overrides };
  const wrapper = mount(<MetadataForm {...props} />);
  return {
    wrapper,
    props
  };
}

describe('<MetadataForm>', () => {
  it('should render', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });

  it('should render the resource as a <Link>', () => {
    const { wrapper, props } = setup();
    const el = wrapper
      .find('Link')
      .findWhere(link => link.prop('href') === props.resource.url);
    expect(el.exists()).toBe(true);
  });

  it('should render an <InputGroup> for each context if props.context is not provided', () => {
    const { wrapper, props } = setup();
    expect(wrapper.find('InputGroup').length).toEqual(
      props.resource.metadata.length
    );
  });

  it('should render an <InputGroup> for a single context if props.context is provided', () => {
    const { wrapper } = setup({ context: 'a' });
    expect(wrapper.find('InputGroup').length).toEqual(1);
    expect(wrapper.find('.InputGroup__heading').text()).toEqual('a');
  });

  it('should add props.resource to state', () => {
    const { wrapper, props } = setup();
    expect(wrapper.state('resource')).toEqual(props.resource);
  });

  it('should call updateResource when the submit button is clicked', () => {
    const { wrapper } = setup();
    const btn = wrapper.find('Button').first();
    const update = jest.fn();
    wrapper.instance().handleSubmit = jest.fn(update);
    btn.simulate('click');
    expect(update).toHaveBeenCalled();
  });

  it('should call handleCancel when the cancel button is clicked', () => {
    const { wrapper, props } = setup();
    const btn = wrapper.find('Button').last();
    btn.simulate('click', { preventDefault: jest.fn() });
    expect(props.handleCancel).toHaveBeenCalled();
  });

  describe('handleSubmit', () => {
    it('should set state.isRequestPending to true', () => {
      const { wrapper } = setup();
      const update = jest.fn(() => ({ then: jest.fn(cb => cb()) }));
      wrapper.instance().setState = jest.fn();
      wrapper.instance().handleSubmit(update)({ preventDefault: jest.fn() });
      expect(wrapper.instance().setState).toHaveBeenCalledWith(
        {
          isRequestPending: true
        },
        expect.any(Function)
      );
    });

    it('should set state.isRequestPending to false when the request completes', () => {
      const { wrapper } = setup();
      wrapper.instance().handleSubmit(mockUpdate)({
        preventDefault: jest.fn()
      });
      expect(wrapper.state('isRequestPending')).toEqual(false);
    });

    it('should call the update function with the correct args', () => {
      const { wrapper, props } = setup();
      wrapper.instance().handleSubmit(mockUpdate)({
        preventDefault: jest.fn()
      });
      expect(mockUpdate).toHaveBeenCalledWith({ ...props.resource });
    });

    it('should call props.onSuccess', () => {
      const { wrapper, props } = setup();
      wrapper.instance().handleSubmit(mockUpdate)({
        preventDefault: jest.fn()
      });
      expect(props.onSuccess).toHaveBeenCalled();
    });
  });

  describe('handleChange', () => {
    it('should update the specified context record', () => {
      const context = 'a';
      const name = 'a one';
      const value = 'I changed this.';
      const { wrapper, props } = setup();
      wrapper.instance().handleChange(context)({ name, value });
      const expected = {
        url: props.resource.url,
        metadata: [
          {
            context: 'a',
            records: [
              { name, value },
              {
                name: 'a two',
                value: 'something else'
              }
            ]
          },
          {
            context: 'b',
            records: [
              {
                name: 'b one',
                value: 'another value'
              }
            ]
          }
        ]
      };
      expect(wrapper.state('resource')).toEqual(expected);
    });
  });

  describe('handleError', () => {
    it('should set state.isRequestPending to false', () => {
      const { wrapper } = setup();
      wrapper.setState({ isRequestPending: true });
      wrapper.instance().handleError();
      expect(wrapper.state('isRequestPending')).toEqual(false);
    });

    it('should call props.showNotification', () => {
      const { wrapper, props } = setup();
      wrapper.instance().handleError();
      expect(props.showNotification).toHaveBeenCalledWith({
        type: 'error',
        content: expect.any(String)
      });
    });
  });

  describe('handleSuccess', () => {
    it('should set state.isRequestPending to false', () => {
      const { wrapper } = setup();
      wrapper.setState({ isRequestPending: true });
      wrapper.instance().handleSuccess();
      expect(wrapper.state('isRequestPending')).toEqual(false);
    });

    it('should call props.onSuccess', () => {
      const { wrapper, props } = setup();
      wrapper.instance().handleSuccess();
      expect(props.onSuccess).toHaveBeenCalled();
    });

    it('should call props.showNotification', () => {
      const { wrapper, props } = setup();
      wrapper.instance().handleSuccess();
      expect(props.showNotification).toHaveBeenCalledWith({
        type: 'success',
        content: expect.any(String)
      });
    });
  });
});
