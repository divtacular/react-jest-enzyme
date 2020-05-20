import axios from 'axios';

export const getSecretWord = async (callback) => {
    const response = await axios.get('//localhost:3030');
    callback(response.data)
};

//export default for mocking convenience
export default {
    getSecretWord
}