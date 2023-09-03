import os
from sqlalchemy.orm import Session

import sqlalchemy

DB_USER = os.environ.get("DB_USER")
DB_PASS = os.environ.get("DB_PASS")
DB_HOST = os.environ.get("DB_HOST") if os.environ.get("DB_HOST") else os.environ.get("INSTANCE_CONNECTION_NAME", None) # noqa E501
DB_PORT = os.environ.get("DB_PORT", "5432")
DB_NAME = os.environ.get("DB_NAME")


def connect_tcp_socket() -> sqlalchemy.engine.base.Engine:
    """Initializes a TCP connection pool for a Cloud SQL instance of Postgres."""
    if os.environ.get("INSTANCE_CONNECTION_NAME", None):
        pool = sqlalchemy.create_engine(
            # Equivalent URL:
            # postgresql+pg8000://<db_user>:<db_pass>@<db_host>:<db_port>/<db_name>
            sqlalchemy.engine.url.URL.create(
                drivername="postgresql+pg8000",
                username=DB_USER,
                password=DB_PASS,
                database=DB_NAME,
                query={"unix_sock": f"{DB_HOST}/.s.PGSQL.5432"}
            ),
        )
    else:
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
    db = Session(bind=connect_tcp_socket())
    try:
        yield db
    finally:
        db.close()
