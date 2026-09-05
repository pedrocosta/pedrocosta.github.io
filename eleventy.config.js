module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addFilter("postDate", d => {
    const x = d instanceof Date ? d : new Date(d);
    return x.toISOString().slice(0, 10);
  });
  eleventyConfig.addCollection("posts", api => api.getFilteredByGlob("src/posts/*.md"));
  return { dir: { input: "src", includes: "_includes", output: "_site" },
    templateFormats: ["njk", "md"], markdownTemplateEngine: "njk", htmlTemplateEngine: "njk" };
};
