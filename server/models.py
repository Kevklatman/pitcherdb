from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class Pitcher(db.Model, SerializerMixin):
    __tablename__ = 'pitcher'
    
    ROWID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String)
    ERA = db.Column(db.Float)  # Changed to Float for more precision
    Yrs = db.Column(db.Integer)
    IP = db.Column(db.Float)  # Changed to Float for more precision
    rk = db.Column(db.Integer)
    ASG = db.Column(db.Boolean)
    From = db.Column(db.Integer)
    To = db.Column(db.Integer)
    img = db.Column(db.String)
    
    def __repr__(self):
        return f"Pitcher('{self.Name}', {self.Yrs}, {self.ERA})"

    def to_dict(self):
        return {
            'name': self.Name,
            'era': self.ERA,
            'yrs': self.Yrs, 
            'IP': self.IP,
            'All-Star': self.ASG,
            'From': self.From,
            'To': self.To,
            'img': self.img

        }
            
    def _round_value(self, value, decimal_places):
        if value is None:
            return None
        return round(float(value), decimal_places)
    
class PitcherView(db.Model, SerializerMixin):
    __tablename__ = 'single_pitcher'

    ID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String)
    ERA = db.Column(db.Float)
    Yrs = db.Column(db.Integer)
    From = db.Column(db.Integer)
    To = db.Column(db.Integer)
    img = db.Column(db.String)

    def __repr__(self):
        return f"PitcherView('{self.Name}', {self.Yrs}, {self.ERA})"

    def to_dict(self):
        return {
            'name': self.Name,
            'era': self.ERA,
            'yrs': self.Yrs,
            'From': self.From,
            'To': self.To,
            'img': self.img
        }


        
    def _round_value(self, value, decimal_places):
        if value is None:
            return None
        return round(float(value), decimal_places)
            
