# utenxel

Welcome to utenxel, the Express.js backend API for a recipe management system.

## Endpoints

- `/api/ingredients`: This endpoint allows you to retrieve a list of ingredients used in recipes. It shows which recipe each ingredient is used in.

- `/api/users`: This endpoint allows you to manage user accounts. Users can create accounts and authenticate themselves.

- `/api/users/pantry`: This endpoint allows users to manage their pantry. Each user has a private pantry where they can add and remove ingredients.

- `/api/recipes`: This endpoint allows you to manage recipes. Users can create new recipes and categorize them as vegan, vegetarian, pescatarian, or meat.

## Functionality

The goal of this backend API is to provide a dynamic front-end experience for users. The main features include:

- Finding recipes based on pantry items: Users can search for recipes that can be made with the ingredients they have in their pantry.

- Percentage match: The API calculates a percentage match for each recipe based on the ingredients in the user's pantry. This helps users find recipes that closely match their available ingredients.

## Getting Started

To get started with utenxel, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/utenxel.git`

2. Install dependencies: `npm install`

3. Set up the database: [Provide instructions on how to set up the database]

4. Start the server: `npm start`

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

MIT License

