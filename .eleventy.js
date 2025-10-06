const { DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  // Set custom directories for input, output, includes, and data
  eleventyConfig.addPassthroughCopy("src/assets/css/style.css");
  eleventyConfig.addPassthroughCopy("src/portraits/**/*.jpg");

  // Add a shortcode for the current year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addFilter("date", (dateObj, format) => {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addNunjucksAsyncShortcode("image", async function(src, alt, sizes, monochrome) {
    // Default to monochrome if not explicitly set to false
    const applyGrayscale = monochrome !== false;

    let metadata = await Image(src, {
      widths: [300, 600, 900, 1200],
      formats: ["jpeg"],
      urlPath: "/portraits/",
      outputDir: "./_site/portraits/",
      sharpJpegOptions: {
        quality: 80,
        grayscale: applyGrayscale,
        progressive: true
      }
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  eleventyConfig.addCollection("portraits", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/portraits/*.md");
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
