from web3 import Web3
import json
import os

class ContractUtility:
    def __init__(self, network_name, secret=None):
        if network_name == "sapphire-testnet":
            self.rpc_url = "https://testnet.sapphire.oasis.io"
        else:
            raise ValueError("Unsupported network")

        self.w3 = Web3(Web3.HTTPProvider(self.rpc_url))
        self.contract_address = os.environ.get("CONTRACT_ADDRESS")

        # Replace with your contract's ABI
        with open("abi.json") as f:
            abi = json.load(f)

        self.contract = self.w3.eth.contract(address=self.contract_address, abi=abi)

    @staticmethod
    def get_contract(name):
        with open(f"{name}.json") as f:
            metadata = json.load(f)
        return metadata["abi"], metadata.get("bytecode")
