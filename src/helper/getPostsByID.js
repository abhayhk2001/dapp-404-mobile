import { backendURL } from "../utils/constants";

const rpcCallForTransaction = async (contract, tag, id) => {
    try {
      console.log(`Performing RPC`, id, tag);
      const post = await contract.methods.getPostByID(id, tag).call();
    //   console.log(post)
      return post;
    } catch (error) {
      console.error('Error in transferTokens >', error);
      return false;
    }
  };

const getPostByID = async (Contract, tags , callback) => {
    const tag_list_json = await fetch(`${backendURL}/tags`);
    const tag_list = await tag_list_json.json();
    let posts = []
    let existing_posts = []
    console.log(tags) // [ [0,1]]
    for(let i=0; i<tags.length; i++){
        let tag = tags[i];
        if(existing_posts.includes(tag[0]*10+tag[1]))
            continue;
        existing_posts.push(tag[0]*10+tag[1])
        let post = await rpcCallForTransaction( Contract, tag[1], tag[0]);
        if(!post)
        continue;
        let tagInd = null
        if(post.tag==0)
            tagInd = 7
        else
            tagInd = post.tag -1
        let _post = {
            id: parseInt(post.id),
            title: post.headline,
            description: post.content,
            tag: {
                    id: post.tag,
                    name: tag_list[tagInd].name,//should add db query here
                },
            reportIDs: post.reports,
            rating:Math.floor(post.rating / 10e3) / 100,
            interactions:post.interactions,
            truth:post.truth,
        }
        if(post.isReportPost){
            let report = await Contract.methods.reportStats(post.id).call();
            console.log(report);
            _post.confirmations = report.confirmations;
            _post.refutations = report.refutations;
        }
        posts.push(_post);
        if(callback)
            callback(_post)
    }
    return posts;
}

export default getPostByID;