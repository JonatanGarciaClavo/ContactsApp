import React from 'react';
import TextField from '../TextField';

describe('Testing TextField component', () => {
  it('renders TextField using Snapshots', () => {
    const wrapper = shallow(
      <TextField
        label="Name"
        placeholder="Name"
        name="name"
        value={''}
        errorText={null}
        onChange={jest.fn}
        onBlur={jest.fn}
        onEnterKeyDown={jest.fn}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('check change functionality', () => {
    const name = 'name';
    const value = 'Test';
    const onChange = jest.fn();
    const wrapper = shallow(
      <TextField
        label="Name"
        placeholder="Name"
        name={name}
        value={''}
        errorText={null}
        onChange={onChange}
        onBlur={jest.fn}
        onEnterKeyDown={jest.fn}
      />
    );
    wrapper.find('TextField').simulate('change', {
      target: { value },
    });
    expect(wrapper.state().value).toEqual(value);
  });
  it('check change functionality without callback', () => {
    const name = 'name';
    const value = 'Test';
    const wrapper = shallow(
      <TextField
        label="Name"
        placeholder="Name"
        name={name}
        value={''}
        errorText={null}
        onChange={null}
        onBlur={jest.fn}
        onEnterKeyDown={jest.fn}
      />
    );
    wrapper.find('TextField').simulate('change', {
      target: { value },
    });
    expect(wrapper.state().value).toEqual(value);
  });
  it('check blur functionality', () => {
    const name = 'name';
    const value = 'Test';
    const onBlur = jest.fn();
    const wrapper = shallow(
      <TextField
        label="Name"
        placeholder="Name"
        name={name}
        value={value}
        errorText={null}
        onChange={jest.fn}
        onBlur={onBlur}
        onEnterKeyDown={jest.fn}
      />
    );
    wrapper.find('TextField').simulate('blur', {
      target: { value },
    });
    expect(onBlur).toBeCalledWith(name, value);
  });
  it('check blur functionality without callback', () => {
    const value = 'Test';
    const wrapper = shallow(
      <TextField
        label="Name"
        placeholder="Name"
        name={name}
        value={''}
        errorText={null}
        onChange={jest.fn}
        onBlur={null}
        onEnterKeyDown={jest.fn}
      />
    );
    wrapper.find('TextField').simulate('blur', {
      target: { value },
    });
  });
  it('check change value when recive new value prop', () => {
    const value = 'Test';
    const wrapper = shallow(
      <TextField
        placeholder="Name"
        name={name}
        value={''}
        errorText={null}
        onChange={jest.fn}
        onBlur={jest.fn}
        onEnterKeyDown={jest.fn}
      />
    );
    expect(wrapper.state().value).toEqual('');
    wrapper.setProps({ value });
    expect(wrapper.state().value).toEqual(value);
  });
  it('check change value when recive same value prop', () => {
    const value = 'Test';
    const wrapper = shallow(
      <TextField
        placeholder="Name"
        name={name}
        value={value}
        errorText={null}
        onChange={jest.fn}
        onBlur={jest.fn}
        onEnterKeyDown={jest.fn}
      />
    );
    expect(wrapper.state().value).toEqual(value);
    wrapper.setProps({ value });
    expect(wrapper.state().value).toEqual(value);
  });
});
