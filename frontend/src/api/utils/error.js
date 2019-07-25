class KeysError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    equals(error) {
        return (
            this.code ===
                (error.response == null ? this.code : error.response.status) &&
            this.message ===
                (error.response == null
                    ? this.message
                    : error.response.data.message)
        );
    }
}

export default GammaError;
