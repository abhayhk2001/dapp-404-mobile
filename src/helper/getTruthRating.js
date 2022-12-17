// import { backendURL } from "../utils/constants";

const getTruthRating = async (newsLang) => {
  try {
    //http://34.28.83.35:5000/run?claim=
    backendURL = "http://34.28.83.35:5000";
    let response = await fetch(`${backendURL}/run?claim=${newsLang}`, {
      method: "post",
    });
    response = await response.json();
    console.log(response);
  } catch (err) {
    return 65.32;
  }
};

getTruthRating("Trump is president");
//export default getTruthRating;
