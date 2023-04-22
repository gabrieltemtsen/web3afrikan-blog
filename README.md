## Web3Afrikan Blog
Web3Afrikan Blog is a decentralised application that allows users to create and post articles on the platform on the Goerli Testnet.
users can read posts and comment on posts.

## Features
1. Create Post(article).
2. Read Posts(articles).
3. Comment on Posts(articles).
4. Vote on content to be removed from the platform(under development*).

## Technologies Used
1. NextJS & ChakraUI 
2. RainBowKit & WAGMI
3. Bunzz 


## Prerequisite     
1. Have MetaMask extension installed.
2. Have Node.js version 16^ installed.
## Getting started

First, Install The Packages:
```bash
npm install
```

second, run the development server:

```bash
npm run dev
```
### To deploy your own Blog smart contract 
1. Navigate to src/contracts copy the PostManager.sol and Post.sol.
2. Head over to Remix Ide paste create paste them there.
3. Compile and deploy The PostManager smart contract.
4. Copy the contract address and the contract ABI.
5. Navigate to src/contracts/constants.ts and replace the values of the variables respectfully 
BLOG_MANAGER_CONTRACT_ADDRESS, BLOG_MANAGER_ABI, BLOG_POST_ABI.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the decentralised Application.


