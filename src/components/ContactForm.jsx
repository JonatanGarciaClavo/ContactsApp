import React, { PropTypes } from 'react';
import { RaisedButton } from 'material-ui';
import { Record } from 'immutable';
import _ from 'lodash';
import TextField from './TextField';

const styles = {
  formContainer: {
    display: 'flex',
    flex: '0 0 auto',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonStyle: {
    margin: '2em 0 0 0',
  },
};

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onSaveClick();
  }

  render() {
    const { contact: { contact: { name, email, phoneNumber, imgUrl }, loading, isModified,
      errors }, onContactAttributeChange, onContactAttributeBlur } = this.props;
    return (
      <div>
        <form style={styles.formContainer} onSubmit={this.onSubmit}>
          <TextField
            label="Name"
            placeholder="Name"
            name="name"
            value={name}
            errorText={errors.get('name')}
            onChange={onContactAttributeChange}
            onBlur={onContactAttributeBlur}
          />
          <TextField
            label="Email"
            placeholder="Email"
            name="email"
            value={email}
            errorText={errors.get('email')}
            onChange={onContactAttributeChange}
            onBlur={onContactAttributeBlur}
          />
          <TextField
            label="Phone number"
            placeholder="Phone number"
            name="phoneNumber"
            value={phoneNumber}
            errorText={errors.get('phoneNumber')}
            onChange={onContactAttributeChange}
            onBlur={onContactAttributeBlur}
          />
          <TextField
            label="Profile image url"
            placeholder="Profile image url"
            name="imgUrl"
            value={imgUrl}
            errorText={errors.get('imgUrl')}
            onChange={onContactAttributeChange}
            onBlur={onContactAttributeBlur}
          />
          <RaisedButton
            style={styles.buttonStyle}
            label="Save contact"
            primary
            onTouchEnd={this.onSubmit}
            onClick={this.onSubmit}
            disabled={loading || !isModified}
          />
        </form>
      </div>
    );
  }
}

ContactForm.defaultProps = {
  onContactAttributeBlur: _.noop,
};

ContactForm.propTypes = {
  contact: PropTypes.instanceOf(Record).isRequired,
  onContactAttributeChange: PropTypes.func.isRequired,
  onContactAttributeBlur: PropTypes.func,
  onSaveClick: PropTypes.func.isRequired,
}

export default ContactForm;
