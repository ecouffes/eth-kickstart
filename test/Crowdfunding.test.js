const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledCrowdfundingFactory = require('../ethereum/build/CrowdfundingFactory');
const compiledCrowdfunding = require('../ethereum/build/Crowdfunding');

let accounts;
let crowdfundingFactory;
let crowdfundingAddress;
let crowdfunding;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    crowdfundingFactory = await new web3.eth.Contract(JSON.parse(compiledCrowdfundingFactory.interface))
    .deploy({data: compiledCrowdfundingFactory.bytecode})
    .send({from: accounts[0], gas: '1000000'});

    // uint: 100wei
    await crowdfundingFactory.methods.createCrowdfunding('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    // Destructuring assignment
    [crowdfundingAddress] = await crowdfundingFactory.methods.getDeployedCrowdfunding().call();

    crowdfunding = await new web3.eth.Contract(
        JSON.parse(compiledCrowdfunding.interface),
        crowdfundingAddress
    );
});


describe('Crowdfunding', () => {
    it('deploys a crowdfundingFactory and a crowdfunding', () => {
        assert.ok(crowdfundingFactory.options.address);
        assert.ok(crowdfunding.options.address);
    });

    // test for constructor
    it('marks caller as the crowdfunding manager', async () => {
        const manager = await crowdfunding.methods.manager().call();
        assert.equal(manager, accounts[0]);
    });

    // test for contribute, approvers,
    it('allows people to contribute money and marks them as approvers', async () => {
        await crowdfunding.methods.contribute().send({
            from: accounts[1],
            value: '200'  // wei
        });

        // mappingを暗黙的getterで呼ぶ場合は、引数でキーを指定する
        const isContributer = await crowdfunding.methods.approvers(accounts[1]).call();
        assert.ok(isContributer);
    });

    // test for contribute
    it('requires a minimum contribution', async () => {
        try {
            await crowdfunding.methods.contribute().send({
                from: accounts[1],
                value: '100'  // wei
            });
        } catch (err) {
            assert.ok(err);
            console.log(err.message);
        }
    });

    // test for createRequest, restricted
    it('allows a manager to make a payment request', async () => {
        await crowdfunding.methods
        .createRequest('Buy batteries', '100', accounts[1])
        .send({from: accounts[0], gas: '1000000'});

        // 配列を暗黙的getterで呼ぶ場合は、引数でキー（index）を指定する
        const request = await crowdfunding.methods.requests(0).call();

        assert.equal(request.description, 'Buy batteries');
        assert.equal(request.value, '100');
        assert.equal(request.recipient, accounts[1]);
        assert.equal(request.isComplete, false);
        assert.equal(request.approvalCount, 0);
        assert.ok(!request.approvals); // not return mapping object
    });

    // test for createRequest
    it('processes requests: one E2E test', async () => {
        await crowdfunding.methods.contribute().send({
            from: accounts[0],  // contributer is accounts[0]
            value: web3.utils.toWei('10', 'ether')  // 10 ether
        });

        await crowdfunding.methods
        .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[5])
        .send({from: accounts[0], gas: '1000000'});

        await crowdfunding.methods.approveRequest(0).send({
            from: accounts[0],  // contributer(approver) must be accounts[0]
            gas: '1000000'
        });

        await crowdfunding.methods.finalizeRequest(0).send({
            from: accounts[0],  // finilizer must be msg.sender
            gas: '1000000'
        });

        let balance = await web3.eth.getBalance(accounts[5]);
        // console.log(balance, typeof balance);
        balance = web3.utils.fromWei(balance, 'ether');
        console.log(balance, typeof balance);
        // balance = parseFloat(balance);
        // console.log(balance, typeof balance);

        assert.equal(balance, '105');
    });


});