# Dinner Planner

Dinner Planner is a cool tool for managing restaurant reservations and reviews with friends. The project is split into a frontend and backend, with a PostgreSQL to store data.

## Start using

  To start using the tool, head to https://dinner.tuomaskangas.com
  and enter a session key to start managing reservations. Share the session key with friends you'd like to eat with!

  The application is not intended for sensitive information.

## Technologies Used

- **Backend**: Python FastAPI
  
- **Frontend**: React with TypeScript

- **Database**: PostgreSQL

- **Infrastructure**: Terraform

- **CI/CD**: GitHub Actions

- **HOSTING**: GCP Cloud Run and Cloud SQL

## Getting Started

1. **Prerequisites**: Ensure you have the following installed:
   - Docker

2. **Clone the Repository**:
   ```bash
   git clone git@github.com:welhoilija/DinnerPlanner.git
   cd DinnerPlanner

### Deployments

  - The application is deployed using GitHub Actions. Check the `.github/workflows` directory for the deployment scripts. Ensure that the pipeline is correctly set up to apply database migrations using Alembic. If you encounter issues with migrations, verify that the Alembic commands are correctly specified in the deployment scripts.

### Enviroment variables

  ```bash
  DB_NAME=your_database_name
  DB_USER=your_database_user
  DB_PASS=your_database_password
  DB_HOST=your_database_host
  DB_PORT=your_database_port
  INSTANCE_CONNECTION_NAME=your_instance_connection_name
  REACT_APP_API_URL=your_api_url
  ```

### Start the Application:

  Use Docker Compose to start the application:

  ```bash
    docker-compose up
  ```

  This will start the frontend, backend, and database services.

### Database Migrations
  Alembic is used for migrations
  ```bash
    alembic upgrade head
  ```

  This will apply any pending migrations to the database.

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
