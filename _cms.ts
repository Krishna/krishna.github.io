import cms from "blog/_cms.ts";

// Add a field in the CMS editor for "excerpts"...
//
const postsOptions = cms.collections.get("posts");

if (postsOptions) {
  // insert an excerpt field in the penulatimate
  // position in the `postsOptions.fields` array, which
  // is just before the "Content" field...

  let positionOfExcerptField = postsOptions.fields.length - 1;
  postsOptions.fields.splice(positionOfExcerptField, 0, {
    name: "excerpt",
    type: "text",
    label: "Excerpt",
    description: "Excerpt displayed on listing on the front page"});
} else {
  console.log("⚠️ Collection 'posts' not found.");
}

// cms.collection({
//   name: "posts",
//   store: "src:posts/*.md",
//   fields: [
//     "excerpt: text",
//   ],
// });


export default cms;
