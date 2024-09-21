from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class Pitcher(db.Model, SerializerMixin):
    __tablename__ = 'pitcher'
    
    # Use ROWID as the primary key
    ROWID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String)
    ERA = db.Column(db.Integer)
    Yrs = db.Column(db.Integer)
    IP = db.Column(db.Integer)
    rk = db.Column(db.Integer)
    ASG = db.Column(db.Boolean)##
    
    def __repr__(self):
        return f"Pitcher('{self.Name}', {self.Yrs}, {self.ERA})"

    def to_dict(self):
        return {
            'name': self.Name,
            'era': self.ERA,
            'yrs': self.Yrs, 
            'IP': self.IP,
            'All-Star': self.ASG
        }
            
    def _round_value(self, value, decimal_places):
        if value is None:
            return None
        return round(float(value), decimal_places)