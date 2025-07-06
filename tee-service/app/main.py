import json
from web3 import Web3
from ContractUtility import ContractUtility
from RoflUtility import RoflUtility

# Intermediate contract address deployed on Ethereum
INTERMEDIATE_CONTRACT = "0x694AA1769357215DE4FAC081bf1f309aDC325306"
INFURA_RPC = "https://mainnet.infura.io/v3/YOUR_INFURA_KEY"

# Initialize Ethereum RPC for intermediate contract
eth = Web3(Web3.HTTPProvider(INFURA_RPC))

# Setup Sapphire contract access via ROFL
rofl_utility = RoflUtility()
contract_utility = ContractUtility("sapphire-testnet", secret=None)  # assumes contract address and ABI are inside ContractUtility
oracle_contract = contract_utility.contract

# Fetch stored price and timestamp from intermediate contract
def fetch_stored_eth_usd():
    abi = json.loads('[{"inputs":[],"name":"getStoredPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]')
    contract = eth.eth.contract(address=INTERMEDIATE_CONTRACT, abi=abi)
    price = contract.functions.getStoredPrice().call() / 1e8
    updated = contract.functions.getLastUpdateTime().call()
    return price, updated

# Submit price to Sapphire smart contract
if __name__ == "__main__":
    print("Fetching price from intermediate ETH contract...")
    price, updated = fetch_stored_eth_usd()
    print(f"Price: {price}, Timestamp: {updated}")

    tx = oracle_contract.functions.setPrice(int(price * 1e8), updated).build_transaction({
        "gas": 150000,
        "gasPrice": contract_utility.w3.eth.gas_price
    })

    print("Submitting tx via ROFL...")
    tx_hash = rofl_utility.submit_tx(tx)
    receipt = contract_utility.w3.eth.wait_for_transaction_receipt(tx_hash)
    print(f"✅ Submitted. Tx hash: {receipt.transactionHash.hex()}")
