import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import LoadingButton from '../common/LoadingButton';
import { addExperience } from '../../redux/actions/profileActions';

class AddExperience extends Component {
  state = {
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
    errors: {},
    isLoading: false
  };

  componentWillReceiveProps(nextProps) {
    const { appStatus } = nextProps;
    if (appStatus) {
      this.setState({ ...appStatus, isLoading: false });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      company, title, location, from, to, current, description
    } = this.state;
    const newExp = {
      company,
      title,
      location,
      from,
      to,
      current,
      description
    };

    this.setState({ isLoading: true });
    this.props.addExperience(newExp);
  };

  render() {
    const {
      company,
      title,
      location,
      from,
      to,
      current,
      description,
      errors,
      isLoading
    } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="* Job Title"
                  name="title"
                  value={title}
                  onChange={onChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="* Company"
                  name="company"
                  value={company}
                  onChange={onChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={onChange}
                  error={errors.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  type="date"
                  name="from"
                  value={from}
                  onChange={onChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  type="date"
                  name="to"
                  value={to}
                  onChange={onChange}
                  error={errors.to}
                  disabled={current}
                />
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    id="current"
                    value={current}
                    checked={current}
                    onChange={(e) => {
                      this.setState({ current: e.target.checked });
                    }}
                  />
                  <label className="form-check-label" htmlFor="current">
                    Current Studying
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={description}
                  onChange={onChange}
                  error={errors.description}
                  info="Tell us about your experience and what you learned"
                />
                <LoadingButton type="submit" loading={isLoading} text="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  appStatus: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  appStatus: state.appStatus
});

const mapDispatchToProps = {
  addExperience
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExperience);
