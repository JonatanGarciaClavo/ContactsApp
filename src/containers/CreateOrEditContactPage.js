import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContactActions from '../actions/contact-actions';
import ContactForm from '../components/ContactForm';

class CreateOrEditContactPage extends Component {
  constructor(props) {
    super(props);
    this.onContactSave = this.onContactSave.bind(this);
    props.actions.initialize();
  }
  componentDidMount() {
    const { actions, params } = this.props;
    actions.loadData(params);
  }
  componentWillReceiveProps(nextProps) {
    const { actions, params } = this.props;
    if (params.id !== nextProps.params.id) {
      actions.loadData(nextProps.params);
    }
  }
  onContactSave() {
    const { actions } = this.props;
    actions.saveContact();
  }
  render() {
    const { contact, actions } = this.props;
    return (
      <ContactForm
        contact={contact}
        onContactAttributeChange={actions.onContactAttributeChange}
        onContactAttributeBlur={actions.onContactAttributeBlur}
        onSaveClick={this.onContactSave}
      />
    );
  }
}

CreateOrEditContactPage.propTypes = {
  contact: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  params: PropTypes.object,
};

const mapStateToProps = (store) => ({
  contact: store.contact,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ContactActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditContactPage);
