## Widebot
It's assignment related to Widebot

## UserManagementSystem

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.3.

## To run the project

Run `ng serve` for a local. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running unit test code coverage

Run `ng test --code-coverage` to execute the unit test code coverage for project.


## Technical Choices

`Angular Material`: Provides a set of reusable UI components based on Material Design.

`Lazy Loading`: Improves performance by loading modules only when they are needed. This is implemented for the admin module.

`Modular Structure`: Separates functionalities into different modules (auth, admin, and shared) for better maintainability and scalability. 

`State Management`: Uses services to manage the state of the application. Components communicate via services to perform CRUD operations and other business logic.

`Fake API(https://jsonplaceholder.typicode.com)`: used to make the fake api for POST, PUT and DELETE call. IN PUT we use fake id of 1 to avoid the error from jsonplaceholder. Didn't used GET to fetch the response from fake api. it returns only static data, so we used State Management here.

## Features

`Authentication`: Simple login page with predefined roles (admin and user).

`Admin Login Credential`: username: `admin`, password: `Admin@1234`

`User Login Credential`: username: `user`, password: `User@1234`

`User Management`: Admin can add, edit, view, and delete users.

`Shared Components`: Common components like loader, navigation, and user profile are shared across the application. 

`Dialog Component`: Used for confirmation and information messages.

`Localization`: Supports localization in the navigation component used to translate static content in english to arabic.

## Contributing

Fork the repository.

Create a new branch (git checkout -b feature/your-feature-name).

Make your changes.

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature/your-feature-name).

Open a pull request.


