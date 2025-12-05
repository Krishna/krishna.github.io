import lume from "lume/mod.ts";
import plugins from "./plugins.ts";

import prism from "lume/plugins/prism.ts";

// Additional prism languages
import "npm:prismjs@1.29.0/components/prism-swift.js";
import "npm:prismjs@1.29.0/components/prism-git.js";
import "npm:prismjs@1.29.0/components/prism-go.js";
import "npm:prismjs@1.29.0/components/prism-rust.js";
import "npm:prismjs@1.29.0/components/prism-typescript.js";
import "npm:prismjs@1.29.0/components/prism-python.js";

const site = lume({ location: new URL("https://krishna.github.io") });
site.use(plugins());
site.use(prism(/* Options */));
site.loadPages([".html"]);

export default site;
