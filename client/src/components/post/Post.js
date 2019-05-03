import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost } from '../../redux/actions/postActions';
import PostItem from '../posts/PostItem';
import Spinner from '../common/Spinner';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

class Post extends Component {
  state = {
    isLoading: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    const { id } = this.props.match.params;
    this.props.getPost(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.postState.post === null && this.state.isLoading) {
      this.props.history.push('/not-found');
    } else {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { post } = this.props.postState;
    const { isLoading } = this.state;
    let postContent;

    if (post === null || isLoading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  postState: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  postState: state.post
});

const mapDispatchToProps = { getPost };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
