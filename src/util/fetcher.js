// fetch function that makes a call to the server on the specified route
export default async function fetcher(url, method, payload) {
    const options = {
        method: method,
        // headers: {
        //     'Content-Type': 'application/json',
        // },
    };

    // if it's a GET request, we don't need the body
    if (payload && method.toUpperCase() !== 'GET') {
        options.body = JSON.stringify(payload);
    }

    return await fetch(url, options);
}
