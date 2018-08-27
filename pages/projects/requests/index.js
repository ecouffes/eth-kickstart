import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import crowdfunding from '../../../ethereum/crowdfunding';
import RequestRow from '../../../components/RequestRow';

class RequestsIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const crowdfundingInstance = crowdfunding(address);
        const requestsCount = await crowdfundingInstance.methods.getRequestsCount().call();
        const approversCount = await crowdfundingInstance.methods.approversCount().call();

        // TODO requestsの中身が何もない場合は、error
        // Promise.all([Promise1, Promise2, Promise3...])
        const requests = await Promise.all(
            // Array(count).fill()
            // count数のarrayをundefinedで埋める
            Array(parseInt(requestsCount)).fill().map((currentVal, index) => {
                return crowdfundingInstance.methods.requests(index).call();
            })
        );
        // console.log(requests);

        return { address, requests, requestsCount, approversCount }
    }

    renderRow() {
        return this.props.requests.map((request, index) => {
            return (
                <RequestRow
                    key={index}
                    id={index}
                    request={request}
                    address={this.props.address}
                    approversCount={this.props.approversCount}
                />
            );
        });
    }


    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
                <h2>Requests</h2>
                <Link route={`/projects/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated={"right"} style={{marginBottom: 10}}>
                            Add Request
                        </Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>{this.renderRow()}</Body>
                </Table>
                <div>Found {this.props.requestsCount} requests.</div>
            </Layout>
        )
    }
}

export default RequestsIndex;