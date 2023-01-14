import { backendURL } from "../utils/constants";
import axios from 'axios'
const getUserTags = async (user_public_address) => {
    try {
        let tags = await axios.get(`${backendURL}/profile/getusertags/${user_public_address}`);

        tags = tags.data
        return tags;
    }
    catch (err) {
        console.log(err);
        return [1,2,5]
    }
}

export default getUserTags;

