import { PropTypes } from 'react'

const { shape, string, func } = PropTypes;

export const contactParamsShape = shape({
  id: string,
});

export const contactActionsShape = shape({
  initialize: func.isRequired,
  recieveContact: func.isRequired,
  loadData: func.isRequired,
  saveContact: func.isRequired,
  validateContact: func.isRequired,
  onContactAttributeChange: func.isRequired,
  onContactAttributeBlur: func.isRequired,
});

export const contactCardActionsShape = shape({
  initialize: func.isRequired,
  loadData: func.isRequired,
  recieveContactCard: func.isRequired,
  deleteContact: func.isRequired,
  transtionToEditContact: func.isRequired,
});

export const contactCardParamsShape = shape({
  id: string,
});

export const contactListActionsShape = shape({
  initialize: func.isRequired,
  loadData: func.isRequired,
  recieveContactList: func.isRequired,
  deleteContact: func.isRequired,
  transitionToEditContact: func.isRequired,
  transitionToContactCard: func.isRequired,
  changeListMode: func.isRequired,
});
