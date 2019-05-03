import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../redux/actions/profileActions';

class Experience extends Component {
  tableContent = () => {
    const { onDelete } = this;
    if (this.props.items.length === 0) {
      return (
        <tr className="text-center text-muted">
          <td>You haven't added any experience yet</td>
        </tr>
      );
    }
    return this.props.items.map(item => (
      <tr key={item._id}>
        <td>{item.company}</td>
        <td>{item.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{item.from}</Moment>
          {' - '}
          {item.to === null ? 'Current' : <Moment format="YYYY/MM/DD">{item.to}</Moment>}
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(item._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  onDelete = (id) => {
    this.props.deleteExperience(id);
  };

  render() {
    const { tableContent } = this;
    return (
      <div>
        <h4>Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <td>Company</td>
              <td>Title</td>
              <td>Years</td>
              <td />
            </tr>
          </thead>
          <tbody>{tableContent()}</tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  items: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};
const mapStateToProps = state => ({});

const mapDispatchToProps = {
  deleteExperience
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Experience);
