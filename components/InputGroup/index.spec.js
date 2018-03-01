import { shallow } from 'enzyme';
import React from 'react';
import InputGroup from './index';

function setup(overrides) {
  const defaultProps = {
    onChange: jest.fn(),
    heading: 'facebook',
    fields: [
      {
        name: 'title',
        value: 'something',
        label: 'Title'
      },
      {
        name: 'description',
        value: 'something else',
        label: 'Description'
      },
      {
        name: 'image',
        value: 'http://image.url.com',
        label: 'Image'
      }
    ]
  };
  const props = { ...defaultProps, ...overrides };
  const wrapper = shallow(<InputGroup {...props} />);
  return {
    wrapper,
    props
  };
}

describe('<InputGroup>', () => {
  it('should render', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });

  it('should render the heading', () => {
    const { wrapper, props } = setup();
    expect(wrapper.find('.InputGroup__heading').text()).toContain(
      props.heading
    );
  });

  it('should render an <Input> for each record except description', () => {
    const { wrapper } = setup();
    expect(wrapper.find('Input').length).toEqual(2);
  });

  it('should render a <Textarea> for each description', () => {
    const { wrapper } = setup();
    expect(wrapper.find('Textarea').length).toEqual(1);
  });

  it('should render a <label> for each field', () => {
    const { wrapper } = setup({
      fields: [
        {
          name: 'foo',
          value: 'foo-value',
          label: 'foo-label'
        },
        {
          name: 'bar',
          value: 'bar-value',
          label: 'bar-label'
        }
      ]
    });
    const fields = wrapper.find('.InputGroup__field');
    expect(
      fields
        .at(0)
        .find('label')
        .exists()
    ).toBe(true);
    expect(
      fields
        .at(0)
        .find('label > span')
        .text()
    ).toEqual('foo-label');
    expect(
      fields
        .at(1)
        .find('label')
        .exists()
    ).toBe(true);
    expect(
      fields
        .at(1)
        .find('label > span')
        .text()
    ).toEqual('bar-label');
  });
});
