"""Base migration

Revision ID: b0e7d2fbaf2a
Revises: 
Create Date: 2023-09-19 19:48:39.300900

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b0e7d2fbaf2a'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('reservations', sa.Column('session_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'reservations', 'sessions', ['session_id'], ['id'])
    op.add_column('reviews', sa.Column('session_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'reviews', 'sessions', ['session_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'reviews', type_='foreignkey')
    op.drop_column('reviews', 'session_id')
    op.drop_constraint(None, 'reservations', type_='foreignkey')
    op.drop_column('reservations', 'session_id')
    # ### end Alembic commands ###