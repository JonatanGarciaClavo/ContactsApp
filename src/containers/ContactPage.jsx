import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Record } from 'immutable';
import ContactCard from '../components/ContactCard';
import ContactCardActions from '../actions/contact-card-actions';
import { contactCardActionsShape, contacCardParamsShape } from '../prop-types';

class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    props.actions.initialize();
  }

  componentDidMount() {
    const { actions, params } = this.props;
    actions.loadData(params);
  }

  onEditClick() {
    const { actions: { transtionToEditContact }, contactCard: { contact } } = this.props;
    transtionToEditContact(contact);
  }

  onDeleteClick() {
    const { actions: { deleteContact }, contactCard: { contact: { id } } } = this.props;
    deleteContact(id);
  }

  render() {
    const { contact } = this.props.contactCard;
    return (
      <ContactCard
        contact={contact}
        onEditClick={this.onEditClick}
        onDeleteClick={this.onDeleteClick}
      />
    );
  }
}

ContactPage.defaultProps = {
  params: {},
};

ContactPage.propTypes = {
  actions: PropTypes.instanceOf(contactCardActionsShape).isRequired,
  contactCard: PropTypes.instanceOf(Record).isRequired,
  params: PropTypes.instanceOf(contacCardParamsShape),
};

const mapStateToProps = store => ({ contactCard: store.contactCard });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ContactCardActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
