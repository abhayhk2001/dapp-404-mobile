const { backendURL } = require("../utils/constants");
const { startLoading, stopLoading } = require("./loader");

const postReportArticle = async (
  Contract,
  Provider,
  reportTag,
  reportID,
  address,
  newsLang,
  headline,
  content,
  rating
) => {
  //     startLoading();
  //     console.log(address,  newsLang, headline, content, rating);
  try {
    let nonce = await Provider.eth.getTransactionCount(address);
    console.log({
      reportTag,
      reportID,
      address,
      newsLang,
      headline,
      content,
      rating
    })
    let post = await Contract.methods
      .reportArticle(
        parseInt(reportTag),
        reportID,
        address,
        newsLang,
        headline,
        content,
        Math.floor(rating * 10e5)
      )
      .send({
        from: address,
        gas: 1000000,
        nonce,
      });

    console.log(post.events.post.returnValues);
    //     stopLoading();
    //     alert("Review posted")
    fetch(`${backendURL}/post/addpost`, {
      method: "post",
      body: JSON.stringify({
        postid: post.events.post.returnValues.id,
        tagid: 0,
        userid: address,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json().then((_data) => console.log(_data)))
      .catch((err) => console.log(err));
    console.log(post);
  } catch (err) {
    console.log(err);
  }
};

export default postReportArticle;
