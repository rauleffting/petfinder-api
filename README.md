Petfinder API 
==============

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

![GitHub stars](https://img.shields.io/github/stars/rauleffting/daily-diet-api?style=flat-square) ![GitHub forks](https://img.shields.io/github/forks/rauleffting/daily-diet-api?style=flat-square) ![GitHub watchers](https://img.shields.io/github/watchers/rauleffting/daily-diet-api?style=flat-square) ![GitHub issues](https://img.shields.io/github/issues/rauleffting/daily-diet-api?style=flat-square)

Petfinder is a backend application that provides a RESTful API for pet adoption. It allows users to find pets by city, view their information, and contact the organization responsible for the pet. 

Features
--------

*   **User can register an organization**: Users can create an organization account on the application.
*   **User can authenticate**: Users can sign in to the application using their organization's credentials.
*   **User can register a pet**: Users can register a pet with their organization's account.
*   **User can add photos to a pet**: Photos can be added to registered pets.
*   **User can list all pets by city**: Users can view a list of all pets available for adoption in a city.
*   **User can search for pets by their characteristics**: Users can search for pets by characteristics such as type, gender, breed, age, and size.
*   **User can view pet details**: Users can see the details of a pet, such as its name, type, gender etc.

Technical Features
--------

*   **Continuous Integration**: Automated CI is set up using GitHub Actions. [View Workflow](https://github.com/rauleffting/fitpass/actions)
*   **Commit Linting**: The repository uses Husky and Commitlint to ensure consistent commit messages.
*   **Prisma ORM**: Prisma is used for database migrations and configurations.
*   **JWT Token**: The app provides a secure authentication method using JWT.
*   **Docker compose**: Docker compose is used to run the PostgreSQL database.
*   **Multer**: Multer is used to upload photos.
*   **AWS S3**: AWS S3 is used to store uploaded photos.
*   **Swagger**: Swagger allows you to test your API endpoints without having to write any code.

Setup
-----

1.  Clone the repository.
2.  Install dependencies using `npm install`.
3.  Set up your environment variables based on the `.env.example` file.
4.  Run docker compose by using `docker compose up -d`.
4.  Start the server using `npm run start:dev`.

Routes
------

To test all routes easily, run the application and use Swagger at http://localhost:3333/documentation.

#### Organizations routes

* `POST - /signup`

  Create a new organization, receiving name, email, password, address, city, state, postal code and phone.

* `POST - /signin`

  Organization can authenticate by email and password.

* `PATCH - /token/refresh`

  Renew access tokens using their refresh tokens.

#### Pets routes

* `POST - /organizations/:organizationId/register-pet`

  Register your new furry friend, providing its name, description, animal type, gender, size, age, and breed.

* `GET - /pets`

  Users can search for pets by city (mandatory) and optionally by type, gender, size, age, and breed.

* `GET - /pets/:petId`

  Users can get pet details.

#### Photos routes

* `POST - /pets/:petId/photos`

  Users can add photos to a pet.

Contributing
------------

Contributions are welcome! Please ensure that your commit messages adhere to the Commitlint conventions.

License
-------

This project is open-sourced under the MIT License.
