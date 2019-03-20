const traverson = require('traverson-promise');
const JsonHalAdapter = require('traverson-hal');

// register the traverson-hal plug-in for media type 'application/hal+json'
traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);

const root = "http://localhost:8080";

export const get = (rels) => {
  return traverson.from(root).jsonHal().follow(rels);
};


export const profile = async (rel) => {
  const rootGet = await traverson
    .from(root)
    .follow('profile')
    .getResource()
    .resultWithTraversal();
  return rootGet
    .traversal
    .continue()
    .withRequestOptions({headers: {'Accept': 'application/schema+json'}})
    .follow(rel);
};

export const put = async (uri, formData) => {
  const result = await traverson.from(uri).jsonHal().put(formData).result;
  console.log(result);
};

export const post = async (rel, formData) => {
  const resource = await traverson.from(root).follow(rel).jsonHal().getResource().resultWithTraversal();
  return resource.post(formData).result;
};