// import { ownerWallet, adContractAddress as contractAddress, private_key } from '../utils/constants'
const getAdByTag = async ( contract, Provider, tags, address) => {
    try {
      console.log(`Performing Ad RPC`);
      let ad = contract.methods.getRandAdByTag(tags);
      let _ad = await ad.call();
      let nonce = await Provider.eth.getTransactionCount(address);
      console.log("From", address)
      ad.send({
        from:address,
        gas:10000000,
        nonce
      }).then((res)=>{
        console.log(res);
      });
      return _ad;
    } catch (error) {
      console.error('Error in ad query>', error);
      return false;
    }
};


export default getAdByTag;