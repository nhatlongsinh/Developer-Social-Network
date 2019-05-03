import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import { getPosts } from '../../redux/actions/postActions';
import PostFeed from './PostFeed';

class Posts extends Component {
  state = {
    isLoading: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.getPosts();
  }

  componentWillReceiveProps() {
    this.setState({ isLoading: false });
  }

  postContent = () => {
    const { posts } = this.props.post;
    const { isLoading } = this.state;

    if (posts === null || isLoading) {
      return <Spinner />;
    }
    return <PostFeed posts={posts} />;
  };

  render() {
    const { postContent } = this;
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  post: state.post
});

const mapDispatchToProps = {
  getPosts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
