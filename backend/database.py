import os
from sqlalchemy.orm import Session

import sqlalchemy
import logging

DB_USER = os.environ.get("DB_USER")
DB_PASS = os.environ.get("DB_PASS")
DB_HOST = os.environ.get("DB_HOST") if os.environ.get("DB_HOST") else os.environ.get("INSTANCE_CONNECTION_NAME", None) # noqa E501
DB_PORT = os.environ.get("DB_PORT", "5432")
DB_NAME = os.environ.get("DB_NAME")


def connect_database() -> sqlalchemy.engine.base.Engine:
    """Initializes a TCP connection pool for a Cloud SQL instance of Postgres."""
    # Equivalent URL:
    # postgresql+pg8000://<db_user>:<db_pass>@/<db_name>
    #                         ?unix_sock=<INSTANCE_UNIX_SOCKET>/.s.PGSQL.5432
    # Note: Some drivers require the `unix_sock` query parameter to use a different key.
    # For example, 'psycopg2' uses the path set to `host` in order to connect successfully.

    if os.environ.get("INSTANCE_CONNECTION_NAME", None):
        pool = sqlalchemy.create_engine(
            # Equivalent URL:
            # postgresql+pg8000://<db_user>:<db_pass>@<db_host>:<db_port>/<db_name>
            sqlalchemy.engine.url.URL.create(
                drivername="postgresql+pg8000",
                username=DB_USER,
                password=DB_PASS,
                database=DB_NAME,
                query={"unix_sock": f"/cloudsql/{DB_HOST}/.s.PGSQL.5432"}
            ),
            pool_size=3,
            max_overflow=3,
            pool_timeout=10,
            pool_recycle=1800,
        )
        logging.warning(f"postgresql+pg8000://{DB_USER}:{DB_PASS}@/{DB_NAME}?unix_sock={DB_HOST}/.s.PGSQL.5432") # noqa E501
    else:
        logging.warning("not using unix socket")
        pool = sqlalchemy.create_engine(
            # Equivalent URL:
            # postgresql+pg8000://<db_user>:<db_pass>@<db_host>:<db_port>/<db_name>
            sqlalchemy.engine.url.URL.create(
                drivername="postgresql+pg8000",
                username=DB_USER,
                password=DB_PASS,
                database=DB_NAME,
                host=DB_HOST,
                port=DB_PORT
            ),
        )
    return pool


def get_db():
    db = Session(bind=connect_database())
    try:
        yield db
    finally:
        db.close()
