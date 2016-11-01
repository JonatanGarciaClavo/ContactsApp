import React from 'react';
import renderer from 'react-test-renderer';
import IconElementList from '../IconElementList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// https://github.com/facebook/jest/issues/1353
jest.mock('react/lib/ReactDefaultInjection');

describe('Testing IconElementList component', () => {
  it('renders IconElementList using Snapshots', () => {
    expect(renderer.create(
    	<MuiThemeProvider>
	      <IconElementList
	        changeListMode={jest.fn}
	      />
	     </MuiThemeProvider>
    )).toMatchSnapshot();
  });
});
