import React, { Component } from 'react';
import factory from '../ethereum/factory';

class ProjectIndex extends Component {

  render() {
    return <p>Project Index!</p>
  }

  async componentDidMount() {
    const projects = await factory.methods.getDeployedCrowdfunding().call();
    console.log(projects);
  }
}

export default ProjectIndex;
