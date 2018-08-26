import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import crowdfunding from '../../../ethereum/crowdfunding';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';

class RequestsNew extends Component {
    state = {
        description: '',
        value: '',
        recipient: '',
        errorMessage: '',
        loading: false
    };

    static async getInitialProps(props) {
        const {address} = props.query;
        return {address}
    }

    async handleSubmit(e) {
        e.preventDefault();

        this.setState({
            loading: true,
            errorMessage: ''
        });

        const crowdfundingInstance = crowdfunding(this.props.address);
        const { description, value, recipient } = this.state;
        
        try {
            const accounts = await web3.eth.getAccounts();
            await crowdfundingInstance.methods
                .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
                .send({from:accounts[0]});

            Router.pushRoute(`/projects/${this.props.address}/requests`);
        } catch (err) {
            this.setState({errorMessage: err.message});
        }

        this.setState({
            loading: false,
            value: ''
        });
     }

    render() {
        return (
            <Layout>
                <Link route={`/projects/${this.props.address}/requests`}><a>Back</a></Link>
                <h2>Create a Request</h2>
                <Form onSubmit={e => this.handleSubmit(e)} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={e => this.setState({description: e.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input
                            value={this.state.value}
                            onChange={e => this.setState({value: e.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={this.state.recipient}
                            onChange={e => this.setState({recipient: e.target.value})}
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button loading={this.state.loading} primary>Create!</Button>
                </Form>
            </Layout>
        )
    }
}

export default RequestsNew;