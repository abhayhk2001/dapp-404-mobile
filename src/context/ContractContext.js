import React, { createContext, useContext, useState } from "react";
import {
  abi,
  userAbi,
  contractAddress,
  rpc_url,
  private_key,
  adContractAddress,
  adAbi,
  userContractAddress,
  backendURL,
} from "../utils/constants.js";
import { decode, encode } from "base-64";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
const Web3 = require("web3");
import { AuthContext } from "./AuthContext.js";
import { Alert } from "react-native";
// const { ethereum } = window;

export const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  const [account, setAccount] = useState(
    "0xbe26757C4e5F124200830E98d5f13D1f95FceF5e".toLowerCase()
  );
  const { login: _login } = useContext(AuthContext);
  const [userAccount, setUserAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [backendContract, setBackendContract] = useState(null);
  const [backendAdContract, setBackendAdContract] = useState(null);
  const [userContract, setUserContract] = useState(null);
  const [backendUserContract, setBackendUserContract] = useState(null);
  const [user, setUser] = useState(null);
  const [backendProvider, setBackendProvider] = useState(null);
  let _bProvider = null;
  let _bUserContract = null;
  const createEthereumContract = async () => {
    try {
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
      let tokenContract = null;
      const Contract = (tokenContract = new backendProvider.eth.Contract(
        abi,
        contractAddress
      ));
      const adContract = new backendProvider.eth.Contract(
        adAbi,
        adContractAddress
      );
      const _backendUserContract = new backendProvider.eth.Contract(
        userAbi,
        userContractAddress
      );
      _bUserContract = _backendUserContract;
      _bProvider = backendProvider;
      setBackendUserContract(_backendUserContract);
      setBackendAdContract(adContract);
      setBackendProvider(backendProvider);
      setBackendContract(tokenContract);
      return Contract;
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (account) => {
    setUserAccount(account);
    const _contract = await createEthereumContract();
    setContract(_contract);
  };

  const contractSignUp = async (public_address) => {
    try {
      let nonce = await _bProvider.eth.getTransactionCount(account);
      // console.log(_bUserContract.methods.createNewUser());
      let sign_up = await _bUserContract.methods.createNewUser(public_address);
      let response = sign_up.call();
      await sign_up.send({
        from: account,
        gas: 1000000,
        nonce,
      });
      console.log("Sign in successful", response);
    } catch (err) {
      console.log(err);
    }
  };
  const getUser = () => {
    if (user) return user;
  };

  const signup = async ({ name, password, publicAddress, email }, callback) => {
    try {
      publicAddress = publicAddress.toLowerCase();
      const _contract = await createEthereumContract();
      setContract(_contract);
      fetch(`${backendURL}/profile`, {
        method: "post",
        body: JSON.stringify({
          name,
          password,
          public_id: publicAddress,
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => resp.json().then((data) => {
        if(data.code==11000){
          Alert.alert("User exists", "This user with public address already exists");
          return;
        }
        setUserAccount(publicAddress);
        contractSignUp(publicAddress);
        _login(publicAddress);
        callback();
      }));
      login(publicAddress);
    } catch (err) {
      console.log(err);
    }
    //Contract interaction
  };
  const getPA = () => {
    return account;
  };

  const SetUser = (_user) => {
    setUser(_user);
  };
  const logout = async () => {};
  const isLoggedIn = () => {
    return account !== "";
  };

  return (
    <ContractContext.Provider
      value={{
        signup,
        account,
        contract,
        backendProvider,
        backendContract,
        backendAdContract,
        backendUserContract,
        login,
        logout,
        isLoggedIn,
        getUser,
        SetUser,
        userAccount,
        getPA,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
