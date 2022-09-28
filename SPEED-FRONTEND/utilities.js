/**
 * Removes __v and _id properties from a MongoDB collection Array.
 * This is to make assertions in testing easier when comparing the mock array 
 *  which does not have those properties.
 * 
 * @param {*} collectionArr 
 * @returns array of documents
 */
module.exports.dropMongoDbProperties = (collectionArr) => {
    return collectionArr.map(({__v, _id, ...document}) => document);
}