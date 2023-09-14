"""add session models

Revision ID: aa121f15c73b
Revises: 35466843ed8b
Create Date: 2023-09-14 18:43:59.071796

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'aa121f15c73b'
down_revision: Union[str, None] = '35466843ed8b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
