import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react'
import factory from '../ethereum/factory';
import Layout from '../components/Layout'

class ProjectIndex extends Component {

    // Class method :initial rendering not to SSR
    static async getInitialProps() {
        // array
        const projects = await factory.methods.getDeployedCrowdfunding().call();
        // console.log(projects);
        return {projects}
    }

    renderProjects() {
        const items = this.props.projects.map(address => {
            return {
                header: address,
                description: <a href="#">View Project</a>,
                fluid: true
            }
        });
        return <Card.Group items={items}/>;
    }

    // cannot use async keyword
    render() {
        return (
            <Layout>
                <div>
                    <h2>Open Projects</h2>
                    <Button
                        floated={"right"}
                        content={"Create Project"}
                        icon={"add"}
                        primary
                    />
                    {this.renderProjects()}
                </div>
            </Layout>
        )
    }

    async componentDidMount() {

    }
}

export default ProjectIndex;
