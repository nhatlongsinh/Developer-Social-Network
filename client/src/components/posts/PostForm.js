import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../redux/actions/postActions';
import LoadingButton from '../common/LoadingButton';

class PostForm extends Component {
  state = {
    text: '',
    errors: {},
    isLoading: false
  };

  componentWillReceiveProps(nextProps) {
    const { appStatus } = nextProps;
    if (appStatus) {
      this.setState({ ...appStatus, isLoading: false });
    } else {
      this.setState({ errors: {}, isLoading: false });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { user } = this.props.auth;
    const post = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(post);
    this.setState({ errors: {}, text: '', isLoading: true });
  };

  render() {
    const { onChange, onSubmit } = this;
    const { text, errors, isLoading } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <TextAreaFieldGroup
                placeholder="Create a post"
                name="text"
                value={text}
                onChange={onChange}
                error={errors.text}
              />
              <LoadingButton
                type="submit"
                className="btn btn-dark"
                text="Submit"
                loading={isLoading}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  appStatus: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  appStatus: state.appStatus,
  post: state.post,
  auth: state.auth
});

const mapDispatchToProps = {
  addPost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);
