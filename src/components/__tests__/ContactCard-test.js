import React from 'react';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import _ from 'lodash';
import ContactCard from '../ContactCard';
import { contact } from '../../../config/jest/mock-data';

describe('Testing ContactCard component', () => {
  it('renders ContactCard using Snapshots', () => {
    expect(renderer.create(
      <MuiThemeProvider>
        <ContactCard
          contact={contact}
          onEditClick={jest.fn}
          onDeleteClick={jest.fn}
        />
      </MuiThemeProvider>
    )).toMatchSnapshot();
  });
  it('renders ContactCard omit phone using Snapshots', () => {
    expect(renderer.create(
      <MuiThemeProvider>
        <ContactCard
          contact={_.omit(contact, 'phoneNumber')}
          onEditClick={jest.fn}
          onDeleteClick={jest.fn}
        />
      </MuiThemeProvider>
    )).toMatchSnapshot();
  });
  it('renders ContactCard omit imgUrl using Snapshots', () => {
    expect(renderer.create(
      <MuiThemeProvider>
        <ContactCard
          contact={_.omit(contact, 'imgUrl')}
          onEditClick={jest.fn}
          onDeleteClick={jest.fn}
        />
      </MuiThemeProvider>
    )).toMatchSnapshot();
  });
});
