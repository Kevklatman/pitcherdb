from flask import Flask, jsonify, make_response, request
from flask_migrate import Migrate
import os
import logging
from models import db, Pitcher, PitcherView  # Import db from models
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Database configuration
current_dir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(current_dir, 'pitchersall.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)  # Initialize the db with the app
migrate = Migrate(app, db)

# Reflect the existing tables
with app.app_context():
    db.Model.metadata.reflect(bind=db.engine)

@app.route("/pitchers", methods=['GET'])
def get_pitchers():
    try:
        sort_by = request.args.get('sort_by', 'rk')
        if sort_by not in ['rk', 'ERA', 'Yrs', 'IP', 'Name']:
            sort_by = 'rk'
        
        reverse = request.args.get('reverse', 'false').lower() == 'true'
        
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 388))
        per_page = max(1, min(per_page, 388))
        
        query = Pitcher.query
        
        if reverse:
            query = query.order_by(getattr(Pitcher, sort_by).desc())
        else:
            query = query.order_by(getattr(Pitcher, sort_by))
        
        total_count = query.count()
        pitchers = query.paginate(page=page, per_page=per_page, error_out=False)
        
        return make_response(jsonify({
            "total_count": total_count,
            "page": page,
            "per_page": per_page,
            "total_pages": pitchers.pages,
            "pitchers": [pitcher.to_dict() for pitcher in pitchers.items]
        }), 200)
    except Exception as e:
        logger.error(f"Error in get_pitchers: {str(e)}")
        return make_response(jsonify({"error": "An unexpected error occurred"}), 500)

@app.route("/pitchers/asg", methods=['GET'])
def get_asg_pitchers():
    try:
        asg_pitchers = Pitcher.query.filter(Pitcher.ASG == True).all()
        return make_response(jsonify([pitcher.to_dict() for pitcher in asg_pitchers]), 200)
    except Exception as e:
        logger.error(f"Error in get_asg_pitchers: {str(e)}")
        return make_response(jsonify({"error": "An unexpected error occurred"}), 500)
    
@app.route("/pitcher/<int:pitcher_id>", methods=['GET'])
def get_single_pitcher(pitcher_id):
    try:
        pitcher = PitcherView.query.get(pitcher_id)
        if pitcher is None:
            return make_response(jsonify({"error": "Pitcher not found"}), 404)
        return make_response(jsonify(pitcher.to_dict()), 200)
    except Exception as e:
        logger.error(f"Error in get_single_pitcher: {str(e)}")
        return make_response(jsonify({"error": "An unexpected error occurred"}), 500)


if __name__ == "__main__":
    app.run(port=5555, debug=True)
