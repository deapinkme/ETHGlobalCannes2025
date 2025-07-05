from fastapi import FastAPI
from pydantic import BaseModel
import json
from web3 import Web3
import base64
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import serialization, hashes

app = FastAPI()

# Setup Ethereum RPC
ETH_RPC_URL = "https://mainnet.infura.io/v3/YOUR_INFURA_KEY"
w3 = Web3(Web3.HTTPProvider(ETH_RPC_URL))

# Chainlink Aggregator address for ETH/USD
CHAINLINK_FEED = "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419"

# Load signer key (In a real TEE, this would be securely stored)
private_key = ec.generate_private_key(ec.SECP256K1())

class PriceResponse(BaseModel):
    price: float
    timestamp: int
    signature: str

@app.get("/price", response_model=PriceResponse)
def get_price():
    contract = w3.eth.contract(address=CHAINLINK_FEED, abi=json.loads('[{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"}]'))

    round_data = contract.functions.latestRoundData().call()
    answer = round_data[1] / 1e8
    updated_at = round_data[3]

    payload = f"{answer}:{updated_at}".encode()
    signature = base64.b64encode(
        private_key.sign(payload, ec.ECDSA(hashes.SHA256()))
    ).decode()

    return PriceResponse(price=answer, timestamp=updated_at, signature=signature)

@app.get("/pubkey")
def get_public_key():
    pubkey = private_key.public_key()
    pem = pubkey.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )
    return {"pubkey": pem.decode()}
