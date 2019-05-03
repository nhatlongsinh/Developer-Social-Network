import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../redux/actions/postActions';

class PostItem extends Component {
  onDelete = (id) => {
    this.props.deletePost(id);
  };

  onLike = (id) => {
    this.props.addLike(id);
  };

  onUnlike = (id) => {
    this.props.removeLike(id);
  };

  isUserLiked = likes => likes.find(l => l.user === this.props.auth.user.id);

  render() {
    const { post, auth, showActions } = this.props;
    const {
      onDelete, onLike, onUnlike, isUserLiked
    } = this;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href={`/profile-id/${auth.user.id}`}>
              <img className="rounded-circle d-none d-md-block" src={post.avatar} alt="" />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <button type="button" className="btn btn-light mr-1" onClick={() => onLike(post._id)}>
              <i
                className={classnames('fas fa-thumbs-up', { 'text-info': isUserLiked(post.likes) })}
              />
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button type="button" className="btn btn-light mr-1" onClick={() => onUnlike(post._id)}>
              <i className="fas fa-thumbs-down" />
            </button>
            {showActions && (
              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
              </Link>
            )}
            {showActions && post.user === auth.user.id && (
              <button type="button" className="btn btn-danger" onClick={() => onDelete(post._id)}>
                <i className="fas fa-times" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  showActions: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  deletePost,
  addLike,
  removeLike
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItem);
