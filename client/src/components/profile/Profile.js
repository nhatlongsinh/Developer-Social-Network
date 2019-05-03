import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import ProfileHeader from './ProfileHeader';
import Spinner from '../common/Spinner';
import { getProfileByHandle, getProfileByUserId } from '../../redux/actions/profileActions';
import isEmpty from '../../validation/is-empty';

class Profile extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    const { handle, id } = this.props.match.params;
    if (handle) {
      this.props.getProfileByHandle(handle);
    } else if (id) {
      this.props.getProfileByUserId(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profileState.profile === null && this.state.isLoading) {
      this.props.history.push('/not-found');
    } else {
      this.setState({ isLoading: false });
    }
  }

  profileContent = () => {
    const { profile } = this.props.profileState;
    const { isLoading } = this.state;
    if (profile === null || isLoading) {
      return <Spinner />;
    }
    if (isEmpty(profile)) {
      return <h1>This user doesn't have profile</h1>;
    }
    return (
      <>
        <div className="row">
          <div className="col-md-6">
            <Link to="/profiles" className="btn btn-light mb-3 float-left">
              Back To Profiles
            </Link>
          </div>
          <div className="col-md-6" />
        </div>
        <ProfileHeader profile={profile} />
        <ProfileAbout profile={profile} />
        <ProfileCreds profile={profile} />
        {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
      </>
    );
  };

  render() {
    const { profileContent } = this;
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent()}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  profileState: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  getProfileByUserId: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profileState: state.profile
});

const mapDispatchToProps = {
  getProfileByHandle,
  getProfileByUserId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
