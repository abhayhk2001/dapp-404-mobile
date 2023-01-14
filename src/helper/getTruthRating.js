import { backendURL } from "../utils/constants";

const getTruthRating = async (newsLang) => {
  try {
    backendURL = "http://34.28.83.35:5000";
    let response = await fetch(`${backendURL}/run?claim=${newsLang}`, {
      method: "post",
    });
    response = await response.json();
    console.log(response);
    return parseFloat(response.COmparision)*100;
  } catch (err) {
    return 15.32;
  }
};

export default getTruthRating;
