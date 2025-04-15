from flask import Flask, jsonify
from flask_cors import CORS
from flask_restful import reqparse, abort
import yfinance as yf
from pymongo import MongoClient
from bson.json_util import dumps
import certifi


app = Flask(__name__)
CORS(app)

cluster = MongoClient("mongodb+srv://shushengli:12345@cluster0.8edbape.mongodb.net/", tlsCAFile=certifi.where())
db = cluster["SellScaleHood"]
portfolio_db = db["portfolio"]

try:
    cluster.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

@app.route("/api/query/<string:ticker>", methods=['GET'])
def query(ticker: str):
    # abort_no_exist(ticker)
    info = yf.Ticker(ticker).info
    if info["trailingPegRatio"]:
        return yf.Ticker(ticker).info
    else:
        return "", 404

@app.route("/api/buy/<string:ticker>/<int:quantity>", methods=["POST"])
def buy(ticker: str, quantity: int):
    ticker = ticker.upper()
    my_stock = portfolio_db.find_one({"_id": ticker})
    info = yf.Ticker(ticker).info
    if not info["trailingPegRatio"]:
        return "", 404
    if my_stock:
        update_quantity = my_stock["quantity"] + quantity
        portfolio_db.update_one({"_id":ticker}, {"$set": {"quantity": update_quantity}})
    else:
        entry = {"_id": ticker,
                    "ticker": ticker,
                    "quantity": quantity}
        portfolio_db.insert_one(entry)
    return portfolio_db.find_one({"_id": ticker}), 201

@app.route("/api/portfolio", methods=["GET"])
def portfolio():
    return jsonify(list(portfolio_db.find()))
    
#abort(409, id already exist)
#abort(404, id doesn't exist)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)