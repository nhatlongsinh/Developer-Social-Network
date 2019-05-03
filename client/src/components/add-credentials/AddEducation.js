import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import LoadingButton from '../common/LoadingButton';
import { addEducation } from '../../redux/actions/profileActions';

class AddEducation extends Component {
  state = {
    school: '',
    degree: '',
    fieldofstudy: '',
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
      school, degree, fieldofstudy, from, to, current, description
    } = this.state;
    const newExp = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };
    this.setState({ isLoading: true });
    this.props.addEducation(newExp);
  };

  render() {
    const {
      school,
      degree,
      fieldofstudy,
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
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="* School Or Bootcamp"
                  name="school"
                  value={school}
                  onChange={onChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="* Degree Or Certificate"
                  name="degree"
                  value={degree}
                  onChange={onChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="* Field Of Study"
                  name="fieldofstudy"
                  value={fieldofstudy}
                  onChange={onChange}
                  error={errors.fieldofstudy}
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
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={description}
                  onChange={onChange}
                  error={errors.description}
                  info="Some of your responsabilities, etc"
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

AddEducation.propTypes = {
  appStatus: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  appStatus: state.appStatus
});

const mapDispatchToProps = {
  addEducation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEducation);
