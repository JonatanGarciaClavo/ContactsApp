import React from 'react';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconElementList from '../IconElementList';

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
