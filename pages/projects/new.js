import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'

class ProjectNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    };

    handleChange(e) {
        this.setState({minimumContribution: e.target.value})
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({
            loading: true,
            errorMessage: ''
        });

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCrowdfunding(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });
        } catch (err) {
            this.setState({errorMessage: err.message});
        }

        this.setState({ loading: false });

    }

    render() {
        return (
            <Layout>
                <h2>Create a project</h2>
                {/* !'String' => cast string into boolean */}
                <Form onSubmit={e => this.handleSubmit(e)} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            label="wei"
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={e => this.handleChange(e)}
                        />
                    </Form.Field>
                    {/* if error prop is true, message displays */}
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button loading={this.state.loading} primary>Create!</Button>
                </Form>
            </Layout>
        )
    }
}

export default ProjectNew;