import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

const ProfileHeader = (props) => {
  const {
    status, company, location, website, user
  } = props.profile;
  const social = props.profile.social ? props.profile.social : {};
  const {
    twitter, facebook, youtube, linkedin, instagram
  } = social;
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img className="rounded-circle" src={user.avatar} alt="" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{user.name}</h1>
            <p className="lead text-center">
              {status}
              {!isEmpty(company) ? <span>{` at ${company}`}</span> : null}
            </p>
            <p>{location}</p>
            <p>
              {!isEmpty(website) && (
                <a className="text-white p-2" href={website}>
                  <i className="fas fa-globe fa-2x" />
                </a>
              )}
              {!isEmpty(twitter) && (
                <a className="text-white p-2" href={twitter}>
                  <i className="fab fa-twitter fa-2x" />
                </a>
              )}
              {!isEmpty(facebook) && (
                <a className="text-white p-2" href={facebook}>
                  <i className="fab fa-facebook fa-2x" />
                </a>
              )}
              {!isEmpty(youtube) && (
                <a className="text-white p-2" href={youtube}>
                  <i className="fab fa-youtube fa-2x" />
                </a>
              )}
              {!isEmpty(linkedin) && (
                <a className="text-white p-2" href={linkedin}>
                  <i className="fab fa-linkedin fa-2x" />
                </a>
              )}
              {!isEmpty(instagram) && (
                <a className="text-white p-2" href={instagram}>
                  <i className="fab fa-instagram fa-2x" />
                </a>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileHeader;
