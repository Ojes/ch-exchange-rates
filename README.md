# Goal
Build a small app that allows a user to buy and sell cryptocurrencies.

## Basic 1: 
The user needs to be able to create a buy/sell order including:

- Operation Type (Buy, Sell)
- Cryptocurrency selected (from: BTC, ETH, USDC) (To buy or sell).
- Currency price.
- Currency amount.
- Order type (Limit, Market).
  - If the order is a Limit order: it needs to be left open for 60 seconds and then be executed automatically. While it is not executed, it must be shown in the Order Book.
  - If the order is a Market order: it needs to be executed immediately.
- The app must show the user how much will they receive in exchange (USD when selling, cryptocurrency when buying).

---

## Basic 2: 
The user needs to be able to see the Order Book containing the open orders. The Order Book must show orders sorted by the order total price and buy orders should be differentiated from sell orders. Executed orders must be removed from the Order Book.

- Advance 1: The user needs to be able to see the history of order transactions.
- Advance 2: Rates/quotes for the different assets must be taken from the Quote Endpoints listed below to show the user a suggested price.
- Advance 3: Every order processed by the system must charge the user a fee of 1.5% and the accumulated amount needs to be shown in the topbar of the app.

![Demo](demo.gif)


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.