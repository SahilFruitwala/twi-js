const TwitterError = require("./Error");
const getData = require("./Fetch");

class Twitter {
  constructor(search_keywords, token, pages, other_options) {
    this.search_keywords = search_keywords;
    this.token = token;
    this.pages = pages;
    this.media_filters = this.generateMediaFilter(other_options.media_filters);
    this.query_filters = this.generateQueryFilter(other_options.query_filters);
    this.options = this.generateOptions(other_options.options);
    this.geocode = this.generateGeocode(other_options.options.geocode);
    this.searchQuery = this.getFinalSearchQuery();
  }

  generateMediaFilter = (media_filters) => {
    if (!media_filters || Object.keys(media_filters).length < 1) {
      return "";
    }
    const final_media_filter = [];
    if (media_filters.hasOwnProperty("links")) {
      final_media_filter.push(
        !media_filters.links ? "-filter:links" : "filter:links"
      );
    }
    if (media_filters.hasOwnProperty("images")) {
      final_media_filter.push(
        !media_filters.images ? "-filter:images" : "filter:images"
      );
    }
    if (media_filters.hasOwnProperty("videos")) {
      final_media_filter.push(
        !media_filters.videos ? "-filter:videos" : "filter:videos"
      );
    }
    return final_media_filter.join(" AND ");
  };

  generateQueryFilter = (query_filters) => {
    if (!query_filters || Object.keys(query_filters).length < 1) {
      return "";
    }
    const final_query_filter = [];
    if (query_filters.hasOwnProperty("retweets")) {
      final_query_filter.push(
        !query_filters.retweets ? "-filter:retweets" : "filter:retweets"
      );
    }
    if (query_filters.hasOwnProperty("replies")) {
      final_query_filter.push(
        !query_filters.replies ? "-filter:replies" : "filter:replies"
      );
    }
    if (query_filters.hasOwnProperty("verified")) {
      final_query_filter.push(
        !query_filters.verified ? "-filter:verified" : "filter:verified"
      );
    }
    return final_query_filter.join(" AND ");
  };

  generateOptions = (options) => {
    if (!options || Object.keys(options).length < 1) {
      return "";
    }
    const final_options = [];
    if (options.hasOwnProperty("include_entities")) {
      final_options.push("include_entities=" + options.include_entities);
    }
    if (options.hasOwnProperty("count")) {
      final_options.push("count=" + options.count);
    }
    if (options.hasOwnProperty("result_type")) {
      final_options.push("result_type=" + options.result_type);
    }
    if (options.hasOwnProperty("lang")) {
      final_options.push("lang=" + options.lang);
    }
    if (options.hasOwnProperty("until")) {
      final_options.push("until=" + options.until);
    }
    return final_options.join("&");
  };

  generateGeocode = (geocode) => {
    console.error(geocode.radius < 0);
    if (!geocode || Object.keys(geocode).length < 1) {
      return "";
    }
    if (Object.keys(geocode).length < 4) {
      throw new TwitterError({
        message: "Please Provide All Required Properties for Geocode!",
        detail: `Current Geocode: ${JSON.stringify(geocode)}`,
      });
    }
    if (
      !geocode.hasOwnProperty("latitude") ||
      !geocode.hasOwnProperty("longitude") ||
      !geocode.hasOwnProperty("radius") ||
      !geocode.hasOwnProperty("matric")
    ) {
      throw new TwitterError({
        message: "Please Provide All Required Properties for Geocode!",
        detail: `Current Geocode: ${JSON.stringify(geocode)}`,
      });
    }
    if (geocode.radius <= 0 || geocode.radius > 1000) {
      throw new TwitterError({
        message: "Radius Error!",
        detail: `Radius should be between 1 and 1000!\nYou provided: ${geocode.radius}`,
      });
    }
    if (
      geocode.matric.toLowerCase() !== "km" &&
      geocode.matric.toLowerCase() !== "mi"
    ) {
      throw new TwitterError({
        message: "Distance Matric Error!",
        detail: `Distance Matric should be either "km" or "mi"!\nYou provided: ${geocode.matric}`,
      });
    }
    return `geocode=${geocode.latitude},${geocode.longitude},${
      geocode.radius
    }${geocode.matric.toLowerCase()}`;
  };

  getFinalSearchQuery = () => {
    const final_url = [];
    final_url.push(`${this.search_keywords}`);
    if (Object.keys(this.query_filters).length > 0) {
      final_url.push(` AND ${this.query_filters}`);
    }
    if (Object.keys(this.media_filters).length > 0) {
      final_url.push(` AND ${this.media_filters}`);
    }
    if (Object.keys(this.options).length > 0) {
      final_url.push(`&${this.options}`);
    }
    if (Object.keys(this.geocode).length > 0) {
      final_url.push(`&${this.geocode}`);
    }
    return final_url.join("");
  };

  fetchData() {
    console.log(this.searchQuery);
    getData(this.searchQuery, this.token, this.pages);
  }
}

module.exports = Twitter;
