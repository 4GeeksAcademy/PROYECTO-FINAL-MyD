from src.app import app
from src.db import db


with app.app_context():
    db.create_all()
    print("✅ All tables created successfully.")
