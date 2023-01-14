import { backendURL } from "../utils/constants";
import getAdByTag from "./getAdByTags";

const rpcCallForTransaction = async (contract, Provider, tag, address) => {
  try {
    console.log(`Performing RPC`);

    let nonce = await Provider.eth.getTransactionCount(address);
    console.log(nonce);
    let _post = contract.methods.getPostByTag(tag);
    let post = await _post.call();

    _post.send({
      from: address,
      gas: 10000000,
      nonce
    })
    console.log(post);
    return post;
  } catch (error) {
    console.error('Error in transferTokens >', error);
    return false;
  }
};

const getPostByTags = async (Contract, adContract, Provider, tags, limit, address, callback) => {
  try {
    tags = [1, 2, 5]
    console.log("Here",address)
    const tag_list_json = await fetch(`${backendURL}/tags`);
    const tag_list = // JSON.parse(`[{"_id":"6363e03840e1118c1fac466a","id":1,"name":"Politics","__v":0},{"_id":"6363e04140e1118c1fac466c","id":2,"name":"Sports","__v":0},{"_id":"6363e05440e1118c1fac466e","id":3,"name":"Entertainment","__v":0},{"_id":"6363e09140e1118c1fac4670","id":4,"name":"Business","__v":0},{"_id":"6363e09940e1118c1fac4672","id":5,"name":"Technology","__v":0},{"_id":"6363e0a440e1118c1fac4674","id":6,"name":"Science","__v":0},{"_id":"6363e0b240e1118c1fac4676","id":7,"name":"Travel & Fashion","__v":0},{"_id":"636fb68e72203f919223fe80","id":0,"name":"Report","__v":0}]`)
                    await tag_list_json.json();
    // console.log(tag_list)
    let posts = []
    let ad
    let post_ids = []

    for (let i = 0; i < limit; i++) {
      let tag = tags[i % tags.length];
      let post = await rpcCallForTransaction(Contract, Provider, tag, address);

      if (!post)
        continue;
      if (i % 3 == 0) {
        try {
          ad = await getAdByTag(adContract, Provider, [0, 1, 2], address)
        } catch (err) {
          console.log("Brk", err, post.ad);
        }
      }
      let tagInd = null
      if (post.tag == 0)
        tagInd = 7
      else
        tagInd = post.tag - 1
      let post_id = parseInt(post.id) * 10 + tagInd
      if (post_ids.includes(post_id))
        continue
      post_ids.push(post_id)
      let _post = {
        id: parseInt(post.id),
        title: post.headline,
        description: post.content,
        tag: {
          id: tagInd,
          name: tag_list[tagInd].name
        },
        reportIDs: post.reports,
        rating: Math.floor(post.rating / 10e3) / 100,
        interactions: post.interactions,
        truth: post.truth,
        ad,
      }
      ad = ""
      if (post.isReportPost) {
        let report = await Contract.methods.reportStats(post.id).call();
        console.log(report);
        post.confirmations = report.confirmations;
        post.refutations = report.refutations;
      }
      console.log(_post);
      posts.push(_post);
      callback(_post);
    }
    console.log(address);
    return posts;
  } catch (err) {
    console.log(err);
  }
}

export default getPostByTags;