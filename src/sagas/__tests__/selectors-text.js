import { contactSelector, contactCardSelector, contactListSelector } from '../selectors';

describe('Test selectors', () => {
  it('returns contact state', () => {
    expect(contactSelector({})).toMatchSnapshot();
  });
  it('returns contact card state', () => {
    expect(contactCardSelector({})).toMatchSnapshot();
  });
  it('returns contact list state', () => {
    expect(contactListSelector({})).toMatchSnapshot();
  });
});
