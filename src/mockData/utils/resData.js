class ResData {
    success(data) {
        return {
            code: 200,
            desc: "success.",
            data: data
        };
    }

    error() {
        return {
            code: 400,
            desc: "error.",
            data: null
        };
    }
}

export default new ResData();