import lumeCMS from "lume/cms/mod.ts";
import { Field } from "lume/cms/types.ts";

const cms = lumeCMS();

const url: Field = {
  name: "url",
  type: "text",
  description: "The public URL of the page. Leave empty to use the file path.",
  transform(value) {
    if (!value) {
      return;
    }

    if (!value.endsWith("/")) {
      value += "/";
    }
    if (!value.startsWith("/")) {
      value = "/" + value;
    }

    return value;
  },
};

cms.document("settings: Global settings for the site", "src:_data.yml", [
  {
    name: "lang",
    type: "text",
    label: "Language",
  },
  {
    name: "home",
    type: "object",
    fields: [
      {
        name: "welcome",
        type: "text",
        label: "Title",
        description: "Welcome message in the homepage",
      },
    ],
  },
  {
    name: "menu_links",
    type: "object-list",
    fields: [
      {
        name: "title",
        type: "text",
        label: "Title",
      },
      {
        name: "url",
        type: "text",
        label: "URL",
      },
    ],
  },
  {
    name: "extra_head",
    type: "code",
    description: "Extra content to include in the <head> tag",
  },
  {
    name: "metas",
    type: "object",
    description: "Meta tags configuration.",
    fields: [
      "site: text",
      "description: text",
      "title: text",
      "image: text",
      "twitter: text",
      "lang: text",
      "generator: checkbox",
    ],
  },
]);

cms.collection("posts: Blog posts", "src:posts/*.md", [
  "title: text",
  url,
  {
    name: "author",
    type: "text",
    init(field, { data }) {
      field.options = data.site?.search.values("author");
    },
  },
  "date: date",
  {
    name: "draft",
    label: "Draft",
    type: "checkbox",
    description: "If checked, the post will not be published.",
  },
  {
    name: "tags",
    type: "list",
    label: "Tags",
    init(field, { data }) {
      field.options = data.site?.search.values("tags");
    },
  },
  {
    name: "comments",
    type: "object",
    fields: [
      {
        name: "src",
        label: "Link to Mastodon post",
        type: "url",
      },
      {
        name: "bluesky",
        label: "Link to Bluesky post",
        type: "url",
      },
    ],
  },
  {
    name: "extra_head",
    type: "code",
    description: "Extra content to include in the <head> tag",
  },
  {
    name: "content",
    type: "markdown",
    label: "Content",
  },
]);

cms.collection(
  "pages: Additional pages, like about, contact, etc.",
  "src:pages/*.md",
  [
    {
      name: "layout",
      type: "hidden",
      value: "layouts/page.vto",
    },
    {
      name: "title",
      type: "text",
      label: "Title",
    },
    url,
    {
      name: "menu",
      type: "object",
      label: "Whether to include in the menu",
      fields: [
        {
          name: "visible",
          type: "checkbox",
          label: "Show in menu",
        },
        {
          name: "order",
          type: "number",
          label: "Order",
        },
      ],
    },
    {
      name: "extra_head",
      type: "code",
      description: "Extra content to include in the <head> tag",
    },
    {
      name: "content",
      type: "markdown",
      label: "Content",
    },
  ],
);

cms.upload("uploads: Uploaded files", "src:uploads");

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
    description: "Excerpt displayed on listing on the front page",
  });
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
