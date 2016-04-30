import React, { Component, PropTypes } from 'react';
import { AppBar, LeftNav, MenuItem, Snackbar } from 'material-ui';
import IconElementList from '../components/IconElementList';
import { browserHistory } from 'react-router';
import ContactListActions from '../actions/contact-list-actions';
import SnackbarActions from '../actions/snackbar-actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const textToRouter = {
  List: '/list',
  About: '/',
  'Add Contact': '/add',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLeftNavOpen: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({ isLeftNavOpen: !this.state.isLeftNavOpen });
  }

  handleClose(e) {
    this.setState({ isLeftNavOpen: false });
    browserHistory.push(textToRouter[e.target.textContent]);
  }

  renderIconElementRight() {
    if (this.props.location.pathname === '/list') {
      return (
        <IconElementList
          changeListMode={this.props.changeListMode}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <div onClick={() => this.onClick}>
        <AppBar
          title="Contacts app"
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={this.renderIconElementRight()}
        />
        <LeftNav
          open={this.state.isLeftNavOpen}
          docked={false}
          onRequestChange={open => this.setState({ isLeftNavOpen: open })}
        >
          <MenuItem onTouchTap={this.handleClose} value="/about">About</MenuItem>
          <MenuItem onTouchTap={this.handleClose} value="/list">List</MenuItem>
          <MenuItem onTouchTap={this.handleClose} value="/add">Add Contact</MenuItem>
        </LeftNav>
        <div>{this.props.children}</div>
        <Snackbar
          open={this.props.snackbar.open}
          message={this.props.snackbar.message}
          autoHideDuration={3000}
          onRequestClose={this.props.closeSnackbar}
        />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object,
  snackbar: PropTypes.object.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
  changeListMode: PropTypes.func.isRequired,
};

App.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};


const mapStateToProps = (store) => ({
  snackbar: store.snackbar,
});

const mapDispatchToProps = (dispatch) => ({
  closeSnackbar: bindActionCreators(SnackbarActions, dispatch).closeSnackbar,
  changeListMode: bindActionCreators(ContactListActions, dispatch).changeListMode,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
