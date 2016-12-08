import React from 'react';
import IconElementList from '../IconElementList';

describe('Testing IconElementList component', () => {
  it('renders IconElementList using Snapshots', () => {
    const wrapper = shallow(
      <IconElementList
        changeListMode={jest.fn}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should click in change mode to List menu option', () => {
    const changeListMode = jest.fn();
    const wrapper = shallow(
      <IconElementList
        changeListMode={changeListMode}
      />
    );
    wrapper.find({ primaryText: 'List' }).simulate('touchTap');
    expect(changeListMode).toHaveBeenCalled();
  });
  it('should click in change mode to Card menu option', () => {
    const changeListMode = jest.fn();
    const wrapper = shallow(
      <IconElementList
        changeListMode={changeListMode}
      />
    );
    wrapper.find({ primaryText: 'Card' }).simulate('touchTap');
    expect(changeListMode).toHaveBeenCalled();
  });
});
