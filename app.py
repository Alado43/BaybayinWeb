from data import baybayin_data
from flask import Flask, jsonify
from flask_cors import CORS
from data import baybayin_data

app = Flask(__name__)
CORS(app)

# API Routes
@app.route('/api/test', methods=['GET'])
def test_api():
    return jsonify({"message": "API is working!", "status": "success"})

@app.route('/api/characters', methods=['GET'])
def get_characters():
    return jsonify(baybayin_data['characters'])

@app.route('/api/resources', methods=['GET'])
def get_resources():
    return jsonify(baybayin_data['resources'])

@app.route('/api/news', methods=['GET'])
def get_news():
    return jsonify(baybayin_data['news'])

@app.route('/api/merchandise', methods=['GET'])
def get_merchandise():
    return jsonify(baybayin_data['merchandise'])

if __name__ == '__main__':
    print("✅ Baybayin API Server Started!")
    print("🌐 Test URL: http://localhost:5000/api/test")
    print("📋 Characters URL: http://localhost:5000/api/characters")
    print("🛑 Press CTRL+C to stop the server")
    app.run(debug=True, port=5000)