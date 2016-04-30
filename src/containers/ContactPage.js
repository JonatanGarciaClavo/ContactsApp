import React, { Component, PropTypes } from 'react';
import ContactCard from '../components/ContactCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContactCardActions from '../actions/contact-card-actions';

class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    const { actions, params } = this.props;
    actions.initializeContactCard(params);
  }

  onEditClick() {
    const { actions: { editContact }, contactCard: { contact } } = this.props;
    editContact(contact);
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

ContactPage.propTypes = {
  actions: PropTypes.object.isRequired,
  contactCard: PropTypes.object.isRequired,
  params: PropTypes.object,
};

const mapStateToProps = (store) => ({ contactCard: store.contactCard });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ContactCardActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
