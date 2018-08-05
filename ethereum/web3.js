import Web3 from 'web3';
const accessToken = process.env.INFURA_ACCESS_TOKEN;

let web3;

// typeof operetor is able to detect the variable
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask(browser wallet) is running.
  // hi-jacking the current web3 provider
  web3 = new Web3(window.web3.currentProvider);
} else {
  // We are on the server(SSR) (like Next.js Server that render the components on the server)
  // *OR*
  // the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/' + accessToken
  );
  web3 = new Web3(provider);
}

export default web3;