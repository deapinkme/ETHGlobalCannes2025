import json
import time
from web3 import Web3
from ContractUtility import ContractUtility
from RoflUtility import RoflUtility

# Intermediate contract address deployed on Ethereum
INTERMEDIATE_CONTRACT = "0x694AA1769357215DE4FAC081bf1f309aDC325306"
INFURA_RPC = "https://sepolia.infura.io/v3/d728370699af4389a5db543e2cf63a37"

# Initialize Ethereum RPC for intermediate contract
eth = Web3(Web3.HTTPProvider(INFURA_RPC))

# Setup Sapphire contract access via ROFL
rofl_utility = RoflUtility()
contract_utility = ContractUtility("sapphire-testnet", secret=None)  # assumes contract address and ABI are inside ContractUtility
oracle_contract = contract_utility.contract

def fetch_eth_usd():
    # Chainlink Price Feed ABI
    abi = json.loads('[{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"}]')
    contract = eth.eth.contract(address=INTERMEDIATE_CONTRACT, abi=abi)
    roundId, answer, startedAt, updatedAt, answeredInRound = contract.functions.latestRoundData().call()
    return answer / 1e8, updatedAt

if __name__ == "__main__":
    while True:
        try:
            print("Fetching price from Chainlink price feed...")
            price, updated = fetch_eth_usd()
            print(f"Price: {price}, Timestamp: {updated}")

            tx = oracle_contract.functions.setPrice(int(price * 1e8), updated).build_transaction({
                "gas": 150000,
                "gasPrice": contract_utility.w3.eth.gas_price,
                "value": 0
            })

            print("Submitting tx via ROFL...")
            tx_hash = rofl_utility.submit_tx(tx)
            receipt = contract_utility.w3.eth.wait_for_transaction_receipt(tx_hash)
            print(f"✅ Submitted. Tx hash: {receipt.transactionHash.hex()}")
            
            # Wait for 5 minutes before next update
            time.sleep(300)
        except Exception as e:
            print(f"Error: {e}")
            time.sleep(60)  # Wait a minute before retrying on error
