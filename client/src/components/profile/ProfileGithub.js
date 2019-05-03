import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import axios from 'axios';

class ProfileGithub extends Component {
  state = {
    clientId: 'cfed0bd18d5faf5696f5',
    clientSecret: 'e5084aeca89ca4102883cc47d24cd558eca77cb4',
    count: 5,
    sort: 'created:asc',
    repos: []
  };

  async componentDidMount() {
    try {
      const { username } = this.props;
      const {
        count, sort, clientId, clientSecret
      } = this.state;

      const { data } = await axios.get(
        `https://api.github.com/users/${username}/repos?page=1&per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
      );

      this.setState({ repos: data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { repos } = this.state;
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-">
            <span className="badge badge-info mr-1">{`Stars: ${repo.stargazers_count}`}</span>
            <span className="badge badge-secondary mr-1">{`Watchers: ${repo.watchers_count}`}</span>
            <span className="badge badge-success mr-1">{`Forks: ${repo.forks_count}`}</span>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}
ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
