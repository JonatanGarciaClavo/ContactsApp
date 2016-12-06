import React from 'react';
import renderer from 'react-test-renderer';
import About from '../About';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('Testing About component', () => {
  it('renders About using Snapshots', () => {
    expect(renderer.create(
      <MuiThemeProvider><About /></MuiThemeProvider>
    )).toMatchSnapshot();
  });
});
