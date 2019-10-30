import axios from 'axios';

const data = {};
const searchQuery = () => {
    let cancel;

    return async query_params => {

        if (cancel) cancel.cancel();

        cancel = axios.CancelToken.source();

        try {

            // Cache query_params if it already exists
            if (data[query_params]) {
                return data[query_params];
            }
            const res = await axios(query_params, { cancelToken: cancel.token });

            const result = res.data;
            data[query_params] = result;

            return result;

        } catch (error) {

            if (axios.isCancel(error)) {
                console.log('Canceled', error.message);
            } else {
                console.log('Internal Server Error ', error.message);
            }

            throw error;
        }
    };
};

export const kenSearch = searchQuery();