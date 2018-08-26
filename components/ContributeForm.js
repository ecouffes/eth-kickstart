import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import crowdfunding from '../ethereum/crowdfunding';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false
    };

    handleChange(e) {
        this.setState({ value: e.target.value })
    };

    async handleSubmit(e) {
        e.preventDefault();

        this.setState({
            loading: true,
            errorMessage: ''
        });

        // show.js（親）から渡されたコントラクトアドレス
        const crowdfundingInstance = crowdfunding(this.props.address);
        // console.log(this.props.address);

        try {
            const accounts = await web3.eth.getAccounts();

            await crowdfundingInstance.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });

            Router.replaceRoute(`/projects/${this.props.address}`);
        } catch (err) {
            this.setState({errorMessage: err.message});
        }

        this.setState({
            loading: false,
            value: ''
        });
    };

    render() {
        return (
            // !'String' => cast string into boolean
            <Form onSubmit={e => this.handleSubmit(e)} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        label="ether"
                        labelPosition="right"
                        value={this.state.value}
                        onChange={e => this.handleChange(e)}
                    />
                </Form.Field>
                {/* if error prop is true, message displays */}
                <Message error header="Oops!" content={this.state.errorMessage}/>
                <Button loading={this.state.loading} primary>Contribute!</Button>
            </Form>
        );
    }
}

export default ContributeForm;