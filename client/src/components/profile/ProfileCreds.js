import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import isEmpty from '../../validation/is-empty';

class ProfileCreds extends Component {
  experienceContent = () => {
    const experience = this.props.profile.experience ? this.props.profile.experience : [];
    return experience.map(({
      company, from, to, description, title
    }, index) => (
      <li key={index} className="list-group-item">
        <h4>{company}</h4>
        <p>
          <Moment format="YYYY-MM-DD">{from}</Moment>
          {' - '}
          {!isEmpty(to) ? <Moment format="YYYY-MM-DD">{to}</Moment> : 'Current'}
        </p>
        {!isEmpty(title) && (
        <p>
          <strong>Position: </strong>
          {title}
        </p>
        )}
        {!isEmpty(description) && (
        <p>
          <strong>Description: </strong>
          {description}
        </p>
        )}
      </li>
    ));
  };

  educationContent = () => {
    const education = this.props.profile.education ? this.props.profile.education : [];
    return education.map(({
      school, from, to, degree, fieldofstudy, description
    }, index) => (
      <li key={index} className="list-group-item">
        <h4>{school}</h4>
        <p>
          <Moment format="YYYY-MM-DD">{from}</Moment>
          {' - '}
          {!isEmpty(to) ? <Moment format="YYYY-MM-DD">{to}</Moment> : 'Current'}
        </p>
        {!isEmpty(degree) && (
        <p>
          <strong>Degree: </strong>
          {degree}
        </p>
        )}
        {!isEmpty(fieldofstudy) && (
        <p>
          <strong>Field Of Study: </strong>
          {fieldofstudy}
        </p>
        )}
        {!isEmpty(description) && (
        <p>
          <strong>Description: </strong>
          {description}
        </p>
        )}
      </li>
    ));
  };

  render() {
    const { experienceContent, educationContent } = this;
    const exp = experienceContent();
    const edu = educationContent();
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {exp.length > 0 ? (
            <ul className="list-group">{exp}</ul>
          ) : (
            <p className="text-center">No experience listed</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {edu.length > 0 ? (
            <ul className="list-group">{edu}</ul>
          ) : (
            <p className="text-center">No education listed</p>
          )}
        </div>
      </div>
    );
  }
}
ProfileCreds.propTypes = { profile: PropTypes.object.isRequired };

export default ProfileCreds;
