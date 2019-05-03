import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../redux/actions/postActions';
import LoadingButton from '../common/LoadingButton';

class CommentForm extends Component {
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
    const { postId } = this.props;
    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addComment(postId, newComment);
    this.setState({ errors: {}, text: '', isLoading: true });
  };

  render() {
    const { onChange, onSubmit } = this;
    const { text, errors, isLoading } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Make a comment...</div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <TextAreaFieldGroup
                placeholder="Replay to post"
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  appStatus: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
  appStatus: state.appStatus,
  auth: state.auth,
  post: state.post
});

const mapDispatchToProps = {
  addComment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);
