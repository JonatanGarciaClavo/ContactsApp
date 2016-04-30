import React from 'react';
import { Card, CardMedia, CardTitle, CardActions, FlatButton } from 'material-ui';
// https://imgur.com/mbZIBzc
const ContactCard = ({ contact, onEditClick, onDeleteClick }) => {
  const { name, imgUrl, email, phoneNumber } = contact;
  return (
    <Card style={{ width: '300px', margin: '1em 0 0 0' }}>
      <CardMedia overlay={<CardTitle title={name} />}>
        <img src={imgUrl ||
          'http://i.imgur.com/mbZIBzc.png'}
        />
      </CardMedia>
      <CardTitle
        titleStyle={{ fontSize: '12pt' }}
        title={email}
        subtitle={phoneNumber || 'Without phone'}
      />
      <CardActions>
        <FlatButton onClick={onEditClick} onTouchStart={onEditClick} label="Edit" />
        <FlatButton onClick={onDeleteClick} onTouchStart={onDeleteClick} label="Delete" />
      </CardActions>
    </Card>
  );
}

ContactCard.propTypes = {
  contact: React.PropTypes.object.isRequired,
  onEditClick: React.PropTypes.func,
  onDeleteClick: React.PropTypes.func,
};

export default ContactCard;
