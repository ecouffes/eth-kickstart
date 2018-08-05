const path = require('path'); // cross platform path compile building
const solc = require('solc');
const fs = require('fs-extra'); // similer to fs module: enable to access to the local file.

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); // delete entire 'build' directory

const crowdfundingPath = path.resolve(__dirname, 'contracts', 'Crowdfunding.sol');
const source = fs.readFileSync(crowdfundingPath, 'utf8');

// Setting 1 as second paramateractivates the optimiser
const output = solc.compile(source, 1).contracts;

// console.log(output); // run with "node compile"

fs.ensureDirSync(buildPath);// write output to the recreating 'build' directory

// output each contracts
for(let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  )
}
