import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import LoadingButton from '../common/LoadingButton';
import { createProfile, getCurrentProfile } from '../../redux/actions/profileActions';
import isEmpty from '../../validation/is-empty';

export class EditProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {},
    isLoading: false
  };

  professionalStatusOptions = [
    { label: '* Select Professional Status', value: 0 },
    { label: 'Developer', value: 'Developer' },
    { label: 'Junior Developer', value: 'Junior Developer' },
    { label: 'Senior Developer', value: 'Senior Developer' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Student or Learning', value: 'Student or Learning' },
    { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
    { label: 'Intern', value: 'Intern' },
    { label: 'Other', value: 'Other' }
  ];

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    const { appStatus, profileState } = nextProps;
    const { profile } = profileState;
    if (appStatus) {
      this.setState({ ...appStatus, isLoading: false });
    }
    if (!isEmpty(profile)) {
      const parsedProfile = Object.assign({}, profile);
      // bring skills array back to CSV
      const skills = profile.skills.join(',');
      parsedProfile.skills = skills;
      if (profile.social) {
        parsedProfile.twitter = profile.social.twitter || '';
        parsedProfile.facebook = profile.social.facebook || '';
        parsedProfile.linkedin = profile.social.linkedin || '';
        parsedProfile.youtube = profile.social.youtube || '';
        parsedProfile.instagram = profile.social.instagram || '';
      }
      this.setState({ ...parsedProfile });
    }
  }

  socialInputs = () => {
    const {
      displaySocialInputs,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
      errors
    } = this.state;
    const { onChange } = this;
    if (!displaySocialInputs) {
      return null;
    }
    return (
      <>
        <InputGroup
          type="text"
          placeholder="Twitter Profile URL"
          icon="fab fa-twitter"
          name="twitter"
          value={twitter}
          error={errors.twitter}
          onChange={onChange}
        />
        <InputGroup
          type="text"
          placeholder="Facebook Page URL"
          icon="fab fa-facebook"
          name="facebook"
          value={facebook}
          error={errors.facebook}
          onChange={onChange}
        />
        <InputGroup
          type="text"
          placeholder="Linkedin Profile URL"
          icon="fab fa-linkedin"
          name="linkedin"
          value={linkedin}
          error={errors.linkedin}
          onChange={onChange}
        />
        <InputGroup
          type="text"
          placeholder="YouTube Channel URL"
          icon="fab fa-youtube"
          name="youtube"
          value={youtube}
          error={errors.youtube}
          onChange={onChange}
        />
        <InputGroup
          type="text"
          placeholder="Instagram Page URL"
          icon="fab fa-instagram"
          name="instagram"
          value={instagram}
          error={errors.instagram}
          onChange={onChange}
        />
      </>
    );
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      displaySocialInputs,
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
    } = this.state;
    const profile = {
      displaySocialInputs,
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
    };
    this.setState({ isLoading: true });
    this.props.createProfile(profile);
  };

  render() {
    const {
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      errors,
      isLoading
    } = this.state;
    const {
      onSubmit, onChange, professionalStatusOptions, socialInputs
    } = this;
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="* Profile handle"
                  name="handle"
                  value={handle}
                  error={errors.handle}
                  onChange={onChange}
                  info="A unique handle for your profile URL. Your full name, company name, nickname,
                    etc (This CAN'T be changed later)"
                />
                <SelectListGroup
                  name="status"
                  options={professionalStatusOptions}
                  value={status}
                  error={errors.status}
                  onChange={onChange}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Company"
                  name="company"
                  value={company}
                  error={errors.company}
                  onChange={onChange}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Website"
                  name="website"
                  value={website}
                  error={errors.website}
                  onChange={onChange}
                  info="Could be your own or a company website"
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={location}
                  error={errors.location}
                  onChange={onChange}
                  info="City & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Skills"
                  name="skills"
                  value={skills}
                  error={errors.skills}
                  onChange={onChange}
                  info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Github Username"
                  name="githubusername"
                  value={githubusername}
                  error={errors.githubusername}
                  onChange={onChange}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="A short bio of yourself"
                  name="bio"
                  value={bio}
                  error={errors.bio}
                  onChange={onChange}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.setState(prevState => ({
                      displaySocialInputs: !prevState.displaySocialInputs
                    }))
                    }
                  >
                    Add Social Network Links
                  </button>
                  <small className="text-muted">(Optional)</small>
                </div>
                {socialInputs()}
                <LoadingButton type="submit" loading={isLoading} text="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
EditProfile.propTypes = {
  appStatus: PropTypes.object.isRequired,
  profileState: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  appStatus: state.appStatus,
  profileState: state.profile
});

const mapDispatchToProps = {
  createProfile,
  getCurrentProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
