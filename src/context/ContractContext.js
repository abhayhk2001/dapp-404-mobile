import React, { createContext, useState } from "react";
import { abi } from "../utils/constants.js";
import {
  contractAddress,
  rpc_url,
  private_key,
  adContractAddress,
  adAbi,
} from "../utils/constants.js";
import { decode, encode } from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }
const Web3 = require("web3");

// const { ethereum } = window;

export const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [backendContract, setBackendContract] = useState(null);
  const [backendAdContract, setBackendAdContract] = useState(null);
  const [user, setUser] = useState(null);
  const [backendProvider, setBackendProvider] = useState(null);

  const createEthereumContract = async () => {
    try {
      //   if (!ethereum) return console.log("Please install metamask");

      let backendProvider = new Web3(rpc_url);
      backendProvider.eth.accounts.wallet.add(private_key);
      //   const _account = await ethereum.request({
      //     method: "eth_requestAccounts",
      //   });
      //   await getProfile(_account[0]);
      //   setAccount(_account[0]);
      // const signer = provider.eth.accounts;
      // const Contract = new backendProvider.eth.Contract(abi, contractAddress);
      //   console.log("Logged in as:", _account);
      let tokenContract = null
      const Contract = tokenContract = new backendProvider.eth.Contract(
        abi,
        contractAddress
      );
      const adContract = new backendProvider.eth.Contract(
        adAbi,
        adContractAddress
      );
      setBackendAdContract(adContract);
      setBackendProvider(backendProvider);
      setBackendContract(tokenContract);
      return Contract;
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (account) => {
    setAccount(account);
    const _contract = await createEthereumContract();
    setContract(_contract);
  };

  const getUser = () => {
    if (user) return user;
  };

  const getPA = () => {
    return account;
  };

  const SetUser = (_user) => {
    setUser(_user);
  };
  const logout = async () => { };
  const isLoggedIn = () => {
    return account !== "";
  };

  return (
    <ContractContext.Provider
      value={{
        account,
        contract,
        backendProvider,
        backendContract,
        backendAdContract,
        login,
        logout,
        isLoggedIn,
        getUser,
        SetUser,
        getPA,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
