import { backendURL } from "../utils/constants";
import { startLoading, stopLoading } from "./loader";
const postToBlockchain = async (
  Contract,
  Provider,
  address,
  newsLang,
  tags,
  headline,
  content,
  rating
) => {
  try {
    console.log(address, newsLang, tags, headline, content, rating);
    // startLoading();
    // rating = 15345000;
    let nonce = await Provider.eth.getTransactionCount(address);
    console.log(nonce);
    let post = await Contract.methods
      .postArticle(address, newsLang, tags, headline, content, rating)
      .send({
        from: address,
        gas: 1000000,
        nonce,
      });
    console.log(post.events.post.returnValues);
    // stopLoading();
    alert("Article posted successfully");
    fetch(`${backendURL}/post/addpost`, {
      method: "post",
      body: JSON.stringify({
        postid: post.events.post.returnValues.id,
        tagid: tags,
        userid: address,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json().then((_data) => console.log(_data)))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

export default postToBlockchain;
