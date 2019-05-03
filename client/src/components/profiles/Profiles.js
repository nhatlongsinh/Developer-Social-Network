import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getProfiles } from '../../redux/actions/profileActions';
import ProfileItem from './ProfileItem';

class Profiles extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.getProfiles();
  }

  componentWillReceiveProps() {
    this.setState({ isLoading: false });
  }

  profileItems = () => {
    const { profiles } = this.props.profileState;
    const { isLoading } = this.state;
    if (profiles === null || isLoading) {
      return <Spinner />;
    }
    if (profiles.length === 0) {
      return <h4>No profiles found ...</h4>;
    }

    return profiles.map((profile, index) => <ProfileItem key={index} profile={profile} />);
  };

  render() {
    const { profileItems } = this;
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="Display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">Browse and connect with developers</p>
              {profileItems()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profileState: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profileState: state.profile
});

const mapDispatchToProps = {
  getProfiles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profiles);
