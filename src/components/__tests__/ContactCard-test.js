import React from 'react';
import renderer from 'react-test-renderer';
import ContactCard from '../ContactCard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { contact } from '../../../config/jest/mock-data';
import _ from 'lodash';

// https://github.com/facebook/jest/issues/1353
jest.mock('react/lib/ReactDefaultInjection');

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
