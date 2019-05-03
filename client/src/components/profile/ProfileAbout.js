import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = (props) => {
  const { user, bio, skills } = props.profile;
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">{`${user.name.trim().split(' ')[0]}'s Bio`}</h3>
          <p className="lead">{bio || ''}</p>
          <hr />
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {skills.map((skill, index) => (
                <div key={index} className="p-3">
                  <i className="fa fa-check" />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
