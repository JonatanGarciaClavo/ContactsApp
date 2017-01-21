import React, { Component, PropTypes } from 'react';
import { List, ListItem, Avatar, LinearProgress, Divider, Subheader } from 'material-ui';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Record } from 'immutable';
import ContactListActions from '../actions/contact-list-actions';
import ContactCard from '../components/ContactCard';
import { LIST_MODE } from '../constants/contact-list-mode-constants';
import { contactListActionsShape } from '../prop-types';

class ListContactPage extends Component {
  constructor(props) {
    super(props);
    this.renderLoader = this.renderLoader.bind(this);
    this.renderContactListItems = this.renderContactListItems.bind(this);
    this.renderContactCardList = this.renderContactCardList.bind(this);
    this.onContactClick = this.onContactClick.bind(this);
    props.actions.initialize();
  }

  componentDidMount() {
    this.props.actions.loadData();
  }

  onContactClick(contact) {
    this.props.actions.transitionToContactCard(contact);
  }

  renderLoader() {
    if (this.props.contactList.get('loading')) {
      return <LinearProgress mode="indeterminate" />
    }
    return <span style={{ width: '4px' }} />;
  }

  renderContactListItems() {
    const { contacts } = this.props.contactList;
    const contactList = [];
    contacts.forEach((contact) => {
      contactList.push(
        <ListItem
          key={`contact-${contact.get('id')}`}
          leftAvatar={contact.get('imgUrl') ?
            <Avatar src={contact.get('imgUrl')} /> :
            <Avatar>{contact.get('name').substring(0, 1)}</Avatar>
          }
          primaryText={contact.get('name')}
          secondaryText={contact.get('email')}
          secondaryTextLines={1}
          onTouchTap={() => this.onContactClick(contact)}
          rightIcon={<DeleteIcon
            onClick={() => this.props.actions.deleteContact(contact.get('id'))}
          />}
        />,
      );
      contactList.push(<Divider key={`divider-${contact.get('id')}`} inset />);
    });
    return contactList;
  }
  renderContactCardList() {
    const { contacts } = this.props.contactList;
    const contactList = [];
    contacts.forEach((contact) => {
      contactList.push(
        <ContactCard
          key={`contact-${contact.get('id')}`}
          contact={contact}
          onEditClick={() => this.props.actions.transitionToEditContact(contact)}
          onDeleteClick={() => this.props.actions.deleteContact(contact.get('id'))}
        />,
      );
      contactList.push(<Divider key={`divider-${contact.get('id')}`} inset />);
    });
    return contactList;
  }

  renderContactList() {
    if (this.props.contactList.get('mode') === LIST_MODE) {
      return (
        <List>
          <Subheader>Contacts</Subheader>
          {this.renderContactListItems()}
        </List>
      );
    }
    return (
      <div style={{ display: 'flex', flex: '0 0 auto', flexWrap: 'wrap' }}>
        {this.renderContactCardList()}
      </div>
    );
  }
  render() {
    return (
      <div style={{ margin: '0.2em 0 0 0' }}>
        {this.renderLoader()}
        {this.renderContactList()}
      </div>
    );
  }
}

ListContactPage.propTypes = {
  actions: contactListActionsShape.isRequired,
  contactList: PropTypes.instanceOf(Record).isRequired,
};

const mapStateToProps = store => ({ contactList: store.contactList });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ContactListActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListContactPage);
