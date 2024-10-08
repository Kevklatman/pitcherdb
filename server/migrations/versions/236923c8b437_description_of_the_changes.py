"""Description of the changes

Revision ID: 236923c8b437
Revises: 
Create Date: 2024-09-25 17:21:09.202235

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '236923c8b437'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pitcher',
    sa.Column('ROWID', sa.Integer(), nullable=False),
    sa.Column('Name', sa.String(), nullable=True),
    sa.Column('ERA', sa.Float(), nullable=True),
    sa.Column('Yrs', sa.Integer(), nullable=True),
    sa.Column('IP', sa.Float(), nullable=True),
    sa.Column('rk', sa.Integer(), nullable=True),
    sa.Column('ASG', sa.Boolean(), nullable=True),
    sa.Column('From', sa.Integer(), nullable=True),
    sa.Column('To', sa.Integer(), nullable=True),
    sa.Column('img', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('ROWID')
    )
    op.create_table('single_pitcher',
    sa.Column('ID', sa.Integer(), nullable=False),
    sa.Column('Name', sa.String(), nullable=True),
    sa.Column('ERA', sa.Float(), nullable=True),
    sa.Column('Yrs', sa.Integer(), nullable=True),
    sa.Column('From', sa.Integer(), nullable=True),
    sa.Column('To', sa.Integer(), nullable=True),
    sa.Column('img', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('ID')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('single_pitcher')
    op.drop_table('pitcher')
    # ### end Alembic commands ###
