import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../redux/actions/profileActions';

class Education extends Component {
  tableContent = () => {
    const { onDelete } = this;
    if (this.props.items.length === 0) {
      return (
        <tr className="text-center text-muted">
          <td>You haven't added any education yet</td>
        </tr>
      );
    }
    return this.props.items.map(item => (
      <tr key={item._id}>
        <td>{item.school}</td>
        <td>{item.degree}</td>
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
    this.props.deleteEducation(id);
  };

  render() {
    const { tableContent } = this;
    return (
      <div>
        <h4>Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <td>School</td>
              <td>Degree</td>
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

Education.propTypes = {
  items: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};
const mapStateToProps = state => ({});

const mapDispatchToProps = {
  deleteEducation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Education);
