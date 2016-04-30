import React, { PropTypes } from 'react';
import TextFieldMUI from 'material-ui/lib/text-field';

class TextField extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(e) {
    const { name, onChange } = this.props;
    if (onChange) {
      onChange(name, e.target.value);
    }
  }

  onBlur(e) {
    const { name, onBlur } = this.props;
    if (onBlur) {
      onBlur(name, e.target.value);
    }
  }

  render() {
    const { value, label, name, placeholder, type, errorText, onEnterKeyDown } = this.props;
    return (
      <TextFieldMUI
        value={value}
        floatingLabelText={label || name}
        hintText={placeholder}
        type={type || 'text'}
        errorText={errorText}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onEnterKeyDown={onEnterKeyDown}
      />

    );
  }
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  errorText: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onEnterKeyDown: PropTypes.func,
};

export default TextField;
