import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import crowdfunding from '../../../ethereum/crowdfunding';

class RequestsIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const crowdfundingInstance = crowdfunding(address);
        const requestCount = await crowdfundingInstance.methods.getRequestsCount().call();

        // TODO requestsの中身が何もない場合は、error
        // Promise.all([Promise1, Promise2, Promise3...])
        const requests = await Promise.all(
            // Array(count).fill()
            // count数のarrayをundefinedで埋める
            Array(requestCount).fill().map((currentVal, index) => {
                return crowdfundingInstance.methods.requests(index).call();
            })
        );
        // console.log(requests);

        return { address, requests, requestCount }
    }

    render() {
        return (
            <Layout>
                <h2>Requests</h2>
                <Link route={`/projects/${this.props.address}/requests/new`}>
                    <a><Button primary>Add Request</Button></a>
                </Link>
            </Layout>
        )
    }
}

export default RequestsIndex;