import React from 'react';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Immutable from 'immutable';
import ContactForm from '../ContactForm';
import { contact } from '../../../config/jest/mock-data';

describe('Testing ContactForm component', () => {
  it('renders ContactForm using Snapshots', () => {
    expect(renderer.create(
      <MuiThemeProvider>
        <ContactForm
          contact={{
            contact: new Immutable.Map(Immutable.fromJS(contact)),
            errors: new Immutable.Map(),
          }}
          onContactAttributeChange={jest.fn}
          onContactAttributeBlur={jest.fn}
          onSaveClick={jest.fn}
        />
      </MuiThemeProvider>
    )).toMatchSnapshot();
  });
});
