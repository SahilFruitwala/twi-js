const TwitterError = require("./Error");
const getData = require("./Fetch");

class Twitter {
  /** 
    @param search_keywords: list of all search keywords in form of string
    @param token: bearer token for twitter api
    @param pages: number of pages want to search
    @param other_options: Object containing many properties and filters
    @returns none
  */
  constructor(
    search_keywords,
    token,
    pages,
    whole_url,
    file_path,
    other_options
  ) {
    if (!whole_url) {
      this.search_keywords = this.generateKeywords(search_keywords);
      this.media_filters = this.generateMediaFilter(
        other_options.media_filters
      );
      this.query_filters = this.generateQueryFilter(
        other_options.query_filters
      );
      this.options = this.generateOptions(other_options.options);
      this.geocode = this.generateGeocode(other_options.options.geocode);
      this.searchQuery = this.getFinalSearchQuery();
    }
    if (whole_url && typeof search_keywords !== 'string') {
      throw new TwitterError({
        message: "Please Provide Valid Search Query!",
        detail: `Current Search Query Value: ${search_keywords}`,
      });
    }
    else {
      this.searchQuery = search_keywords;
    }
    if (typeof token !== 'string') {
      throw new TwitterError({
        message: "Please Provide Valid Token!",
        detail: `Current Token Value: ${token}`,
      });
    } else {
      this.token = token;
    }
    if (typeof pages !== "number" || !Number.isInteger(pages)) {
      throw new TwitterError({
        message: "Please Provide Valid Page Number!",
        detail: `Current Page Number Value: ${pages}`,
      });
    } else {
      this.pages = pages;
    }
    if (typeof file_path !== "string") {
      throw new TwitterError({
        message: "Please Provide Valid Path!",
        detail: `Current File Path Value: ${file_path}`,
      });
    } else {
      this.file_path = file_path;
    }
  }

  generateKeywords = (search_keywords) => {
    let final_keyword = search_keywords.replace(/#/g, "%23");
    final_keyword = final_keyword.replace(/\s/g, "%20");
    final_keyword = final_keyword.replace(/"/g, "%22");
    console.log(final_keyword);
    return final_keyword;
  };

  /**
   * Takes media_filters object and combined them into one string.
   *
   * @param {Object} media_filters - Get object containing media filters
   * @returns {string} - Combination of media filters
   *
   * media_filters: {
   *    links: boolean | undefined,
   *    images: boolean | undefined,
   *    videos: boolean | undefined
   *    media: boolean | undefined
   *    vine: boolean | undefined
   * }
   *
   */
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
    if (media_filters.hasOwnProperty("media")) {
      final_media_filter.push(
        !media_filters.media ? "-filter:media" : "filter:media"
      );
    }
    if (media_filters.hasOwnProperty("vine")) {
      final_media_filter.push(
        !media_filters.vine ? "-filter:vine" : "filter:vine"
      );
    }
    return final_media_filter.join("%20AND%20");
  };

  /**
   * Takes query_filters object and combined them into one string.
   *
   * @param {Object} query_filters - Get object containing query filters
   * @returns {string} - Combination of query filters
   *
   * query_filters: {
   *    retweets: boolean | undefined,
   *    replies: boolean | undefined,
   *    verified: boolean | undefined
   *    to: string | undefined
   *    from: string | undefined
   *    safe: boolean | undefined
   * }
   *
   */
  generateQueryFilter = (query_filters) => {
    if (!query_filters || Object.keys(query_filters).length < 1) {
      return "";
    }
    const final_query_filter = [];
    if (query_filters.hasOwnProperty("from")) {
      final_query_filter.push("from:" + query_filters.from);
    }
    if (query_filters.hasOwnProperty("to")) {
      final_query_filter.push("to:" + query_filters.to);
    }
    if (query_filters.hasOwnProperty("safe")) {
      final_query_filter.push(
        !query_filters.safe ? "-filter:safe" : "filter:safe"
      );
    }
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
    return final_query_filter.join("%20AND%20");
  };

  /**
   * Takes options object and combined them into one string.
   *
   * @param {Object} options - Get options object with different parameters.
   * @returns {string} - Combination of different options/parameters
   *
   * options: {
   *    include_entities: boolean | undefined,
   *    count: number | undefined,
   *    result_type: string | undefined,
   *    lang: string | undefined,
   *    until: string | undefined,
   *    tweet_mode: string | undefined
   * }
   *
   */
  generateOptions = (options) => {
    if (!options || Object.keys(options).length < 1) {
      return "";
    }
    const final_options = [];
    if (options.hasOwnProperty("include_entities")) {
      final_options.push("include_entities=" + options.include_entities);
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
    if (
      options.hasOwnProperty("tweet_mode") &&
      options.tweet_mode === "extended"
    ) {
      final_options.push("tweet_mode=" + options.tweet_mode);
    }
    if (
      options.hasOwnProperty("tweet_mode") &&
      options.tweet_mode !== "extended"
    ) {
      throw new TwitterError({
        message: "Please Provide Valid Value for 'tweet_mode'!",
        detail: `Current 'tweet_mode' value: ${JSON.stringify(
          options.tweet_mode
        )}`,
      });
    }
    if (options.hasOwnProperty("count")) {
      final_options.push("count=" + options.count);
    }
    if (!options.hasOwnProperty("count")) {
      final_options.push("count=15");
    }
    return final_options.join("&");
  };

  /**
   * Takes geocode object and make one location parameter
   *
   * @param {Object} geocode - Get geocode object with location parameters
   * @returns {string} - Complete geocode/geolocation
   *
   * geocode: {
   *    latitude: number,
   *    longitude: number,
   *    radius: number,
   *    matric: string,
   * }
   *
   */
  generateGeocode = (geocode) => {
    if (!geocode || Object.keys(geocode).length < 1) {
      return "";
    }
    if (Object.keys(geocode).length < 4) {
      throw new TwitterError({
        message: "Please Provide All Required Properties for Geocode!",
        detail: `Current Geocode Value: ${JSON.stringify(geocode)}`,
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
        detail: `Current Geocode Value: ${JSON.stringify(geocode)}`,
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

  /**
   * Uses 'this'
   * @returns {string} - Combination of all provided keywords, filters and different option parameters
   */
  getFinalSearchQuery = () => {
    const final_url = [];
    final_url.push(`${this.search_keywords}`);
    if (Object.keys(this.query_filters).length > 0) {
      final_url.push(`%20AND%20${this.query_filters}`);
    }
    if (Object.keys(this.media_filters).length > 0) {
      final_url.push(`%20AND%20${this.media_filters}`);
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
    getData(this.searchQuery, this.token, this.pages, this.file_path);
  }
}

module.exports = Twitter;
