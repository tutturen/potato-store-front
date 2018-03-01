# potato-store-front
A front for the potato store with all goods except potatoes. School project in TDT4242.

GitHub pages link: http://tutturen.github.io/potato-store-front

## Important components

Component | Description
----------|------------
App | Main part, put inside whatever Router is relevant. Split into Header and Main.
Layout | Responsible for the overall layout. Includes the Header and Footer. The children is used as the main content.
Header | Header shared by all pages.
Content | Wrapper with stylings specific to the main content part of the page.
Main | Main part of the page, with all the routes of highest level (deeper components may employ more specific routes).

