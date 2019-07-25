export function successfully(type) {
    return response => ({
        type,
        error: false,
        payload: {
            data: response.data
        }
    });
}

export function failed(type) {
    return error => ({
        type,
        error: true,
        payload: {
            error
        }
    });
}

export function loading(type) {
    return () => ({
        type,
        error: false,
        payload: {}
    });
}
