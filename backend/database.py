import os
from sqlalchemy.orm import Session

import sqlalchemy

DB_USER = os.environ.get("DB_USER")
DB_PASSWORD = os.environ.get("DB_PASSWORD")
DB_HOST = os.environ.get("DB_HOST")
DB_PORT = os.environ.get("DB_PORT", "5432")
DB_NAME = os.environ.get("DB_NAME")

INSTANCE_CONNECTION_NAME = os.environ.get("INSTANCE_CONNECTION_NAME", None)
if INSTANCE_CONNECTION_NAME:
    parts = INSTANCE_CONNECTION_NAME.split(":")
    if len(parts) == 4:
        DB_HOST = parts[3]
        DB_PORT = "5432"  # Assuming a default PostgreSQL port
        DB_NAME = parts[2]
    else:
        # Handle the case where INSTANCE_CONNECTION_NAME is not in the expected format
        raise ValueError("Invalid INSTANCE_CONNECTION_NAME format")
elif not DB_HOST and not DB_NAME:
    # Handle the case where INSTANCE_CONNECTION_NAME is not set
    raise ValueError("NO INSTANCE CONNECTION OR DB NAME/HOST")

# Now you can use DB_HOST, DB_PORT, and DB_NAME for your database connection


def connect_tcp_socket() -> sqlalchemy.engine.base.Engine:
    """Initializes a TCP connection pool for a Cloud SQL instance of Postgres."""
    # Note: Saving credentials in environment variables is convenient, but not
    # secure - consider a more secure solution such as
    # Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
    # keep secrets safe.
    db_host = DB_HOST
    db_user = DB_USER
    db_pass = DB_PASSWORD
    db_name = DB_NAME
    db_port = DB_PORT

    pool = sqlalchemy.create_engine(
        # Equivalent URL:
        # postgresql+pg8000://<db_user>:<db_pass>@<db_host>:<db_port>/<db_name>
        sqlalchemy.engine.url.URL.create(
            drivername="postgresql+pg8000",
            username=db_user,
            password=db_pass,
            host=db_host,
            port=db_port,
            database=db_name,
        ),
        # ...
    )
    return pool


def get_db():
    db = Session(bind=connect_tcp_socket())
    try:
        yield db
    finally:
        db.close()
