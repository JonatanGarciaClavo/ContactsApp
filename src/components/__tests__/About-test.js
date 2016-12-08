import React from 'react';
import About from '../About';

describe('Testing About component', () => {
  it('renders About using Snapshots', () => {
  	const wrapper = shallow(<About />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
