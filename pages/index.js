import React, {Component} from 'react';
import { Card, Button } from 'semantic-ui-react'
import factory from '../ethereum/factory';

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
                description: <a href="#">View Project</a>,
                fluid: true
            }
        });

        return <Card.Group items={items}/>;
    }

    // cannot use async keyword
    render() {
        return (
            <div>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
                <h2>Open Projects</h2>
                {this.renderProjects()}
                <Button
                    content={"Create Project"}
                    icon={"add"}
                    primary
                />
            </div>
        )
    }

    async componentDidMount() {

    }
}

export default ProjectIndex;
