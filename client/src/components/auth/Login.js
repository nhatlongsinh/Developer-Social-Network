import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../redux/actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import LoadingButton from '../common/LoadingButton';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    isLoading: false
  };

  componentWillReceiveProps(nextProps) {
    const { appStatus } = nextProps;
    if (appStatus) {
      this.setState({ ...appStatus, isLoading: false });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const { email, password } = this.state;
    const user = { email, password };
    this.props.loginUser(user);
  };

  render() {
    const {
      email, password, errors, isLoading
    } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={onSubmit}>
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  error={errors.password}
                />
                <LoadingButton type="submit" loading={isLoading} text="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  appStatus: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  appStatus: state.appStatus
});

const mapDispatchToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
