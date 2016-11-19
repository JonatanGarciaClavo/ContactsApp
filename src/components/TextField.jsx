import React, { PropTypes } from 'react';
import TextFieldMUI from 'material-ui/TextField';
import _ from 'lodash';

class TextField extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.state = {
      value: props.value,
    };
    this.cbOnChange = _.debounce(props.onChange, 250);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  onChange(e) {
    const { name, onChange } = this.props;
    const value = e.target.value;
    this.setState({ value });
    if (onChange) {
      this.cbOnChange(name, value);
    }
  }

  onBlur(e) {
    const { name, onBlur } = this.props;
    if (onBlur) {
      onBlur(name, e.target.value);
    }
  }

  render() {
    const { label, name, placeholder, type, errorText, onEnterKeyDown } = this.props;
    return (
      <TextFieldMUI
        value={this.state.value}
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
