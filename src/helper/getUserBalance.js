const getUserBalance = async (contract, address) => {
    try {
      console.log(`Performing RPC`, address);
      const balance = await contract.methods.checkUserBalance(address).call();
    //   console.log(post)
      return balance;
    } catch (error) {
      console.error('Error while getting balance >', error);
      return false;
    }
};

export default getUserBalance;