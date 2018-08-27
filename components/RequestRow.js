import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import crowdfunding from '../ethereum/crowdfunding';

class RequestRow extends Component {

    async handleClickOnApprove(e) {
        const crowdfundingInstance = crowdfunding(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await crowdfundingInstance.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        });

        // TODO: Refresh
    };

    async handleClickOnFinalize(e) {
        const crowdfundingInstance = crowdfunding(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await crowdfundingInstance.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        });

        // TODO: Refresh
    }

    render() {
        const { Row, Cell } = Table;
        const { id, request, approversCount } = this.props;
        const { description, value, recipient, approvalCount, isComplete } = request;
        const readyToFinalize = approvalCount > approversCount / 2;

        return (
            <Row disabled={isComplete} positive={readyToFinalize && !isComplete}>
                <Cell>{id}</Cell>
                <Cell>{description}</Cell>
                <Cell>{web3.utils.fromWei(value, 'ether')}</Cell>
                <Cell>{recipient}</Cell>
                <Cell>{approvalCount}/{approversCount}</Cell>
                <Cell>
                    {isComplete ? null : (
                        <Button basic color="green" onClick={e => this.handleClickOnApprove(e)}>
                            Approve
                        </Button>
                    )}
                </Cell>
                <Cell>
                    {isComplete ? null : (
                        <Button basic color="teal" onClick={e => this.handleClickOnFinalize(e)}>
                            Finalize
                        </Button>
                    )}
                </Cell>
            </Row>
        )
    }
};

export default RequestRow;