import React, { Component, PropTypes } from 'react';
import { List, ListItem, Avatar, LinearProgress, Divider } from 'material-ui';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContactListActions from '../actions/contact-list-actions';
import ContactCard from '../components/ContactCard';
import _ from 'lodash';
import { LIST_MODE } from '../constants/contact-list-mode-constants';

class ListContactPage extends Component {
  constructor(props) {
    super(props);
    this.renderLoader = this.renderLoader.bind(this);
    this.renderContactListItems = this.renderContactListItems.bind(this);
    this.renderContactCardList = this.renderContactCardList.bind(this);
    this.onContactClick = this.onContactClick.bind(this);
  }

  componentDidMount() {
    this.props.actions.initializeContactList();
  }

  onContactClick(contact) {
    this.props.actions.loadContactCard(contact);
  }

  renderLoader() {
    if (this.props.contactList.loading) {
      return <LinearProgress mode="indeterminate" />
    }
    return <span style={{ width: '4px' }}></span>;
  }

  renderContactListItems() {
    const { contacts } = this.props.contactList;
    const contactList = [];
    _.each(contacts, (contact, index) => {
      contactList.push(
        <ListItem
          key={contact.id}
          leftAvatar={contact.imgUrl ?
            <Avatar src={contact.imgUrl} /> : <Avatar>{contact.name.substring(0, 1)}</Avatar>}
          primaryText={contact.name}
          secondaryText={contact.email}
          secondaryTextLines={1}
          onTouchTap={() => this.onContactClick(contact)}
          rightIconButton={<DeleteIcon
            onClick={() => this.props.actions.deleteContact(contact.id)}
          />}
        />
      );
      contactList.push(<Divider key={index} inset />);
    });
    return contactList;
  }
  renderContactCardList() {
    const { contacts } = this.props.contactList;
    const contactList = [];
    _.each(contacts, (contact, index) => {
      contactList.push(
        <ContactCard
          key={contact.id}
          contact={contact}
          onEditClick={() => this.props.actions.editContact(contact)}
          onDeleteClick={() => this.props.actions.deleteContact(contact.id)}
        />
      );
      contactList.push(<Divider key={index} inset />);
    });
    return contactList;
  }

  renderContactList() {
    if (this.props.contactList.mode === LIST_MODE) {
      return (
        <List subheader="Contacts">
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
  actions: PropTypes.object.isRequired,
  contactList: PropTypes.object.isRequired,
};

const mapStateToProps = (store) => ({ contactList: store.contactList });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ContactListActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListContactPage);

