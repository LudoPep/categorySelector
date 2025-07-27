# CategorySelector

This project was generated using Angular version 20.0.5.
It is a Single Page Application where the user can select a category among multiple category groups.
The user can search through all categories using a keyword, or search by category group.
A display option is available, allowing either a classic view by category group or an alphabetical view.

Once a category is selected, a button is enabled to submit the user choice.


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.


## Styling choice

The project uses SCSS stylesheets, which allow style nesting.


## Unit Testing

Unit tests have been implemented for Categories component, using JEST.
They can be launched using the following command :

```bash
npm run test-ci
``` 

## Backend

The project uses 2 different endpoint from a distant backend (on port 3000) : 

`http://localhost:3000/all-categories` => returns all categories,
`http://localhost:3000/visible-categories` => returns IDs of categories that must be visible on screen


## Font
Since the 'Eina03-SemiBold' font is not freely available, the 'Quicksand' font was used because it closely resembles it
