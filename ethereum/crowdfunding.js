import web3 from './web3';
import Crowdfunding from './build/Crowdfunding';

export default address => {
    return new web3.eth.Contract(
        JSON.parse(Crowdfunding.interface),
        address
    );
}