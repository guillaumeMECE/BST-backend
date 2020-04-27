
const generateTag = () => {
    return Math.random().toString(36).substring(3);
};

module.exports = {
    generateTag,
};
