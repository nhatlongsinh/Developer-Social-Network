import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../redux/actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps() {
    this.setState({ isLoading: false });
  }

  onDeleteClick = () => {
    this.props.deleteAccount();
  };

  dashboardContent = () => {
    const { user } = this.props.auth;
    const { profile } = this.props.profile;
    const { isLoading } = this.state;
    const { onDeleteClick } = this;

    let dashboardContent;

    if (profile === null || isLoading) {
      dashboardContent = <Spinner />;
    } else if (Object.keys(profile).length > 0) {
      const exp = profile.experience ? profile.experience : [];
      const edu = profile.education ? profile.education : [];
      // user has profile data
      dashboardContent = (
        <div>
          <p className="lead text-muted">
            Welcome
            <Link to={`/profile/${profile.handle}`}>{` ${user.name}`}</Link>
          </p>
          <ProfileActions />
          <Experience items={exp} />
          <Education items={edu} />
          <button type="button" className="btn btn-danger" onClick={onDeleteClick}>
            Delete My Account
          </button>
        </div>
      );
    } else {
      // User has no profile
      dashboardContent = (
        <div>
          <p className="lead text-muted">
            Welcome
            {` ${user.name}`}
          </p>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }
    return dashboardContent;
  };

  render() {
    const { dashboardContent } = this;
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  deleteAccount: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  isLoading: state.appStatus.isLoading
});

const mapDispatchToProps = {
  getCurrentProfile,
  deleteAccount
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
