export const sendPost = async (url, handler, data) => {
    const fetchPromise = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data,
    });

    if (handler)
        handler(fetchPromise);
    else
        return fetchPromise;
};

export const sendGet = async (url, handler) => {
    const fetchPromise = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (handler)
        handler(fetchPromise);
    else
        return fetchPromise;
};

export const sendHead = async (url, handler) => {
    const fetchPromise = await fetch(url, {
        method: 'HEAD',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (handler)
        handler(fetchPromise);
    else
        return fetchPromise;
};