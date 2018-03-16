# potato-store-front

A front for the potato store with all goods except potatoes. School project in TDT4242.

GitHub pages link: http://tutturen.github.io/potato-store-front

## Usage

### Installing dependencies

This project uses a JavaScript-stack. You should install Node and yarn before installing the project specific dependencies with:

```sh
yarn install
```

### Configuring

We use [environment variables](https://en.wikipedia.org/wiki/Environment_variable) to hold configurations we expect to differ between installations. The linked Wikipedia article is mandatory reading if you are not already familiar with how to use environment variables. Commands below do _not_ include the process of configuring environment variables.

| Environment variable  | Description                                                                                                                                                                                         | Default value                                                |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `REACT_APP_BACKEND`   | URL of the backend to use. This and `REACT_APP_BASE_NAME` is likely the only variables you need to set. When you run Django locally, you should set this to something like `http://localhost:8000`. | `https://potato-store.herokuapp.com` (our deployed backend). |
| `REACT_APP_BASE_NAME` | Path to where the React application is deployed on the server, as seen from the client. When you run the application locally, you should set this to something like `/`.                            | `/potato-store-front` (our deployed frontend).               |

### Building

Used when going into production, with extra optimizations. Warnings are elevated to errors, so take care.

```sh
yarn build
```

### Developing

Start local development server, by default at port 3000. You'll probably want to set the `REACT_APP_BACKEND` environment variable, as described above.

```sh
yarn start
```

### [Storybook](https://storybook.js.org/)

Utility for developing individual React Components, with the ability to use different properties so you can exercise different aspects of your Component.

```sh
yarn run storybook
```

## Technologies

We mention the most important technologies here, to make it easier for readers to understand what's going on.

### [React](https://reactjs.org/)

Too big to describe with own words here, but it lets us create a single page application in a way where you can trace the flow of data easily, and encapsulate the different parts of your page.

### [Apollo Client](https://www.apollographql.com/docs/react/)

As it says in their website: "Apollo Client is the ultra-flexible, community driven GraphQL client for React, JavaScript, and native platforms. It is designed from the ground up to make it easy to build UI components that fetch data with GraphQL".

## Important React components

| Component | Description                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| App       | Main part, put inside whatever Router is relevant. Has all the configuration of the Apollo Client. Split into Layout and Main. |
| Layout    | Responsible for the overall layout. Includes the Header and Content. The children is used as the main content.                 |
| Header    | Header shared by all pages.                                                                                                    |
| Content   | Wrapper with stylings specific to the main content part of the page.                                                           |
| Main      | Main part of the page, with all the routes of highest level (deeper components may employ more specific routes).               |

## Structure

### Reading and writing state

When the application starts, the App component gets its state from LocalStorage for variables that are saved across visits to the site. This is done via the `apollo-link-state` package that enables us to create a GraphQL interface for localStorage.

Each component specifies to Apollo their specific data requirements in form of a graphQL query, and Apollo handles the data loading, authentication and error handling.
When we want to make changes to the state, this is done in form of graphQL mutations. Some are mutations that go directly to the server, like logging in, or buying a cart. Other mutations is just done locally, like logging out or adding a product to the cart.
