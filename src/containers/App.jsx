import React, { Component, PropTypes } from 'react';
import { AppBar, Drawer, MenuItem, Snackbar } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory, locationShape } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Record } from 'immutable';
import IconElementList from '../components/IconElementList';
import ContactListActions from '../actions/contact-list-actions';
import SnackbarActions from '../actions/snackbar-actions';

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
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Contacts app"
            onLeftIconButtonTouchTap={this.handleToggle}
            iconElementRight={this.renderIconElementRight()}
          />
          <Drawer
            open={this.state.isLeftNavOpen}
            docked={false}
            onRequestChange={open => this.setState({ isLeftNavOpen: open })}
          >
            <MenuItem onTouchTap={this.handleClose} value="/about">About</MenuItem>
            <MenuItem onTouchTap={this.handleClose} value="/list">List</MenuItem>
            <MenuItem onTouchTap={this.handleClose} value="/add">Add Contact</MenuItem>
          </Drawer>
          <div>{this.props.children}</div>
          <Snackbar
            open={this.props.snackbar.get('open')}
            message={this.props.snackbar.get('message')}
            autoHideDuration={3000}
            onRequestClose={this.props.closeSnackbar}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  location: locationShape.isRequired,
  snackbar: PropTypes.instanceOf(Record).isRequired,
  closeSnackbar: PropTypes.func.isRequired,
  changeListMode: PropTypes.func.isRequired,
};

App.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  muiTheme: PropTypes.object.isRequired,
};


const mapStateToProps = store => ({
  snackbar: store.snackbar,
});

const mapDispatchToProps = dispatch => ({
  closeSnackbar: bindActionCreators(SnackbarActions, dispatch).closeSnackbar,
  changeListMode: bindActionCreators(ContactListActions, dispatch).changeListMode,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
