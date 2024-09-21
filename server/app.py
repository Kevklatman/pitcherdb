from flask import Flask, jsonify, make_response
from flask_migrate import Migrate
import os
from models import db, Pitcher
import logging
from flask import request

app = Flask(__name__)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Get the absolute path to the current directory
current_dir = os.path.abspath(os.path.dirname(__file__))

# Construct the full path to the database file
db_path = os.path.join(current_dir, 'pitchers.db')

# Use the full path in the database URI
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

# Reflect the existing tables
with app.app_context():
    try:
        db.metadata.reflect(bind=db.engine)
        logger.info("Database tables reflected successfully")
    except Exception as e:
        logger.error(f"Error reflecting database tables: {str(e)}")


#adding a sort_by parameter to the URL, e.g., /pitchers?sort_by=ERA.
@app.route("/pitchers", methods=['GET'])
def get_pitchers():
    try:
        sort_by = request.args.get('sort_by', 'rk')
        if sort_by not in ['rk', 'ERA', 'Yrs', 'IP', 'Name']:
            sort_by = 'rk'
        
        reverse = request.args.get('reverse', 'false').lower() == 'true'
        
        # Get the total count
        total_count = Pitcher.query.count()
        
        # Prepare the query
        query = Pitcher.query
        
        # Apply sorting
        if reverse:
            query = query.order_by(getattr(Pitcher, sort_by).desc())
        else:
            query = query.order_by(getattr(Pitcher, sort_by))
        
        # Apply pagination if requested
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 388))
        per_page = max(1, min(per_page, 388))  # Limit to 1-100 per page
        
        # Execute the query with pagination
        pitchers = query.paginate(page=page, per_page=per_page, error_out=False)
        
        return make_response(jsonify({
            "total_count": total_count,
            "page": page,
            "per_page": per_page,
            "total_pages": pitchers.pages,
            "pitchers": [pitcher.to_dict() for pitcher in pitchers.items]
        }), 200)
    except Exception as e:
        return make_response(jsonify({"error": str(e)}), 500)
    

@app.route("/pitchers/asg", methods=['GET'])
def get_asg_pitchers():
    try:
        asg_pitchers = Pitcher.query.filter(Pitcher.ASG == True).all()
        return make_response(jsonify([pitcher.to_dict() for pitcher in asg_pitchers]), 200)
    except Exception as e:
        return make_response(jsonify({"error": str(e)}), 500)

    
    
#example route call with max queries /pitchers?sort_by=ERA&reverse=true&page=3&per_page=30

if __name__ == "__main__":
    app.run(port=5555, debug=True)
