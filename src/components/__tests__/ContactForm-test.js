import React from 'react';
import renderer from 'react-test-renderer';
import ContactForm from '../ContactForm';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { contact } from '../../../config/jest/mock-data';

// https://github.com/facebook/jest/issues/1353
jest.mock('react/lib/ReactDefaultInjection');

describe('Testing ContactForm component', () => {
  it('renders ContactForm using Snapshots', () => {
    expect(renderer.create(
      <MuiThemeProvider>
        <ContactForm
          contact={{ contact, errors: {} }}
          onContactAttributeChange={jest.fn}
          onContactAttributeBlur={jest.fn}
          onSaveClick={jest.fn}
        />
      </MuiThemeProvider>
    )).toMatchSnapshot();
  });
});
