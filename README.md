# Dinner Planner

Dinner Planner is a cool tool for managing restaurant reservations and reviews with friends. The project is split into a frontend and backend, with a PostgreSQL to store data.

## Test it out!

  The application is not intended for storing sensitive information.

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
