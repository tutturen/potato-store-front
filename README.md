# potato-store-front
A front for the potato store with all goods except potatoes. School project in TDT4242.

GitHub pages link: http://tutturen.github.io/potato-store-front

## Important components

Component | Description
----------|------------
App | Main part, put inside whatever Router is relevant. Controls much of the state. Split into Layout and Main.
Layout | Responsible for the overall layout. Includes the Header and Footer. The children is used as the main content.
Header | Header shared by all pages.
Content | Wrapper with stylings specific to the main content part of the page.
Main | Main part of the page, with all the routes of highest level (deeper components may employ more specific routes).

## Structure

### Data flow, cart

![Diagram showing how props and changes to state are delegated](docs/cart-data-flow.png)

Data flows from top and downwards. The App component is the highest common ancestor, and is therefore where the state is located.

### Reading and writing state

![Diagram showing how the App component reads its state from LocalStorage at initialization, and then makes changes to LocalStorage when needed and updates its state from LocalStorage.](docs/cart-data-timeline.png)

When the application starts, the App component gets its state from LocalStorage for variables that are saved across visits to the site. Other data is just initialized to defaults. Afterwards, whenver a change is required – like adding a product to the cart – a function in the App component is invoked which first updates LocalStorage, then reads state from LocalStorage. We use this approach to reduce the space where bugs can occur, by using the same procedure to get state values both on initialization and on later changes. By using the React state, we can use the native way of propagating and re-rendering the page when changes occur.
