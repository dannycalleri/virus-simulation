module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended'],
    rules: {
        // note you must disable the base rule as it can report incorrect errors
        "indent": "off",
        "@typescript-eslint/indent": ["error", 2]
    }
};
