import web3 from './web3';
import CrowdfundingFactory from './build/CrowdfundingFactory';
import factoryAddress from './factoryAddress'

const instance = new web3.eth.Contract(
  JSON.parse(CrowdfundingFactory.interface),
  factoryAddress.rinkeby
);

export default instance;