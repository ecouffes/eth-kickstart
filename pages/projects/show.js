import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import crowdfunding from "../../ethereum/crowdfunding";
import web3 from "../../ethereum/web3";

class ProjectShow extends Component {

    // next router give the routing infomation to props
    static async getInitialProps(props) {
        // get rooting query address
        // console.log(props.query.address)
        const crowdfundingInstance = crowdfunding(props.query.address);
        const summary = await crowdfundingInstance.methods.getSummary().call();

        // return object
        // console.log(summary);

        return {
            miniumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCard() {
        const {
            miniumContribution,
            balance,
            requestsCount,
            approversCount,
            manager
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description:
                    'The manager created this project and can create requests to withdraw money',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: miniumContribution,
                meta: 'Minium Contribution (wei)',
                description:
                    'You must contribute at least this much wei to become a approver'
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description:
                    'A request tries to withdraw money from the contract. Request must be approved by approvers'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description:
                    'Number of people who have already donated to this project'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Project Balance (ether)',
                description:
                    'The balance is how much money this project has left to spend.'
            },
        ];

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <h2>Project Show</h2>
                {this.renderCard()}
            </Layout>
        )
    }
}

export default ProjectShow;