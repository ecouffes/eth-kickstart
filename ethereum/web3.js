import Web3 from 'web3';
import { network } from './network';
const accessToken = process.env.INFURA_ACCESS_TOKEN;

let web3;
let provider;

// typeof operetor is able to detect the variable
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // We are in the browser and metamask(browser wallet) is running.
    // hi-jacking the current web3 provider
    web3 = new Web3(window.web3.currentProvider);
} else {
    // We are on the server(SSR) (like Next.js Server that render the components on the server)
    // *OR*
    // the user is not running metamask

    // TODO: refactoring to create Network.json
    // SEE deploy.js
    switch(network) {
        case 'mainnet':
            provider = new Web3.providers.HttpProvider(
                'https://mainnet.infura.io/' + accessToken
            );
            break;
        case 'rinkeby':
            provider = new Web3.providers.HttpProvider(
                'https://rinkeby.infura.io/' + accessToken
            );
            break;
        case 'ropsten':
            provider = new Web3.providers.HttpProvider(
                'https://ropsten.infura.io/' + accessToken
            );
            break;
        case 'ganache':
            provider = new Web3.providers.HttpProvider(
                'http://127.0.0.1:7545'
            );
            break;
        default:
            provider = new Web3.providers.HttpProvider(
                'http://127.0.0.1:7545'
            );
            break;
    }
    web3 = new Web3(provider);
}

export default web3;