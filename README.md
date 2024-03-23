# CELO MARKETPLACE
- Demo: [Marketplace](https://celo-frontend-react-app-ruddy.vercel.app/)

## About The Project

- A simple marketplace dApp built on the Celo blockchain. The decentralized marketplace application will allow users to list their items for sale, purchase items, view listed items and give product reviews. It is built on the pre-existing marketplace smart contract with added functionalities and an improved frontend page. The following functionalities were added

1. To the smart contract
- A `review` property to the array of `Review` struct.
- A `writeReview` function that enables users to give reviews.
- A `readReview` function that fetches users' reviews.

2. To the frontend
- Display the product review.
- A `ProductReviews.tsx` component to display all the product reviews.
- A `see review or hide review` button to allow users to display or hide reviews.


## Built With

Celo Composer is built on Celo to make it simple to build dApps using a variety of front-end frameworks, and libraries.

- [Celo](https://celo.org/)
- [Solidity](https://docs.soliditylang.org/en/v0.8.19/)
- [Next.js](https://nextjs.org/)
- [React.js](https://reactjs.org/)
- [Rainbowkit-celo](https://github.com/celo-org/rainbowkit-celo)

## Prerequisites

- Node
- Git (v2.38 or higher)

## Quick Start

To get this project up running locally, follow these simple steps:

1. Clone the repository:

```bash
git clone https://github.com/kenkaboshcodes/celo-frontend.git
```

2. Navigate to the `react-app` directory:

```bash
cd celo-frontend/packages/react-app
```

3. Install the dependencies:

```bash
yarn install
```

4. Run the dapp:

```bash
yarn run dev
```

<!-- TESTING APP -->

To properly test the dapp you will need to have a Celo wallet with testnet tokens.
This learning module [NFT Contract Development with Hardhat](https://hackmd.io/exuZTH2hTqKytn2vxgDmcg) will walk you through the process of creating a Metamask wallet and claiming Alfajores testnet tokens.
   
<!-- CONTRIBUTING -->

## :writing_hand: Contributing

Contributions are what makes the open source community such an amazing place to learn, inspire, and create. Any
contributions you make are **greatly appreciated**.

If you have a suggestion to improve this, please fork the repo and create a pull request. You can also
open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your new feature branch (`git checkout -b feature/new_feature`)
3. Commit your changes (`git commit -m 'included a new feature(s)'`)
4. Push to the branch (`git push origin feature/new_feature`)
5. Open a pull request


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

#  Thank you
