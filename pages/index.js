import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class ProjectIndex extends Component {

    // Class method :initial rendering not to SSR
    static async getInitialProps() {
        // array
        const projects = await factory.methods.getDeployedCrowdfunding().call();
        // console.log(projects);
        return { projects }
    }

    renderProjects() {
        const items = this.props.projects.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/projects/${address}`}>
                        <a>View Project</a>
                    </Link>
                ),
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
                    <Link route="/projects/new">
                        <a>
                            <Button
                                floated={"right"}
                                content={"Create Project"}
                                icon={"add"}
                                primary
                            />
                        </a>
                    </Link>
                    {this.renderProjects()}
                </div>
            </Layout>
        )
    }

    async componentDidMount() {

    }
}

export default ProjectIndex;
