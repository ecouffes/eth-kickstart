pragma solidity ^0.4.22;

contract CrowdfundingFactory {
    address[] public deployedCrowdfunding;

    function createCrowdfunding(uint minimum) public {
        address newCrowdfunding = new Crowdfunding(minimum, msg.sender);
        deployedCrowdfunding.push(newCrowdfunding);
    }

    function getDeployedCrowdfunding() public view returns (address[]) {
        return deployedCrowdfunding;
    }

}

contract Crowdfunding {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool isComplete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public miniumContribution;
    mapping(address => bool) public approvers; // contributer
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator) public {
        manager = creator;
        miniumContribution = minimum;
    }

    // 寄付をする
    function contribute() public payable {
        require(msg.value > miniumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    // 寄付金使用リクエスト作成
    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            isComplete: false,
            approvalCount: 0
            });
        requests.push(newRequest);
    }

    // 寄付金使用リクエストを承認する
    function approveRequest(uint index) public {
        Request storage request = requests[index];

        // someone already donated or not?
        require(approvers[msg.sender]);

        // someone already approve request or not?
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        // 寄付者の50%以上が、寄付金使用リクエストに承認しているかチェック
        require(request.approvalCount > (approversCount / 2));
        require(!request.isComplete);

        request.recipient.transfer(request.value);
        request.isComplete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
            miniumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestCount() public view returns (uint) {
        return requests.length;
    }
}