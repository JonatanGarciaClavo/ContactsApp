import React from 'react';
import { IconMenu, MenuItem, IconButton } from 'material-ui';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import { LIST_MODE, CARD_MODE } from '../constants/contact-list-mode-constants';

const IconElementList = ({ changeListMode }) => (
  <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="List" onTouchTap={() => changeListMode(LIST_MODE)} />
    <MenuItem primaryText="Card" onTouchTap={() => changeListMode(CARD_MODE)} />
  </IconMenu>
);

IconElementList.propTypes = {
  changeListMode: React.PropTypes.func.isRequired,
};

export default IconElementList;
