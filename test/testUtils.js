
/**
 * Return ShallowWrapper containing node(s) with the specified data-test val
 * @function findByTestAttr
 * @param {ShallowWrapper}  wrapper - Enzyme shallow wrapper, context to search in
 * @param {string} val - Value of data-test to search for
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test='${val}']`);
}