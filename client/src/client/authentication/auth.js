

const auth = {
    isAuthenticated: false,

    authenticte (cb) {
        this.isAuthenticated = true;
        // cb();
    },

    signout (cb) {
        this.isAuthenticated = false;
        // cb();
    }
}

export default auth;