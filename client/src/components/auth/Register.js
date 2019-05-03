import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { registerUser } from '../../redux/actions/authActions';
import LoadingButton from '../common/LoadingButton';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
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

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });

    const {
      name, email, password, password2
    } = this.state;
    const newUser = {
      name,
      email,
      password,
      password2
    };

    this.props.registerUser(newUser);
  };

  render() {
    const {
      name, email, password, password2, errors, isLoading
    } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={onChange}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
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
                <TextFieldGroup
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  error={errors.password2}
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
Register.propTypes = {
  appStatus: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  appStatus: state.appStatus
});

const mapDispatchToProps = {
  registerUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
