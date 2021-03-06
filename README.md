# Twi-JS

## Installation

```bash
npm install twi-js
```

## Configuring Module

```javascript
const Twitter = require("twi-js");
```

## How to use

#### Main Module

```javascript
try {
   
  const twitter = new Twitter(search_keywords, bearer_token, pages, whole_search, options);
  twitter.fetchData();

} catch (error) {
  console.log(error);
}
```

#### Arguments

1. search_keywords (required): List of all keywords, hashtags and users
2. bearer_token (required): Beare token
3. pages (required): Number of times you want to search
3. whole_search (required): Pass true if user has generated whole search query else false
4. options (optional): Options contains lot of filters

#### Options Argument

Options is an object which contains other objects and values. Options contains following properties:

1. media_filters
2. query_filters
3. options
   * include_entities
   * count
   * result_type
   * lang
   * until
   * tweet_mode
   * geocode

Above mentioned all are optional parameters. search_keywords, bearer_token and pages are only required parameters.

---

#### Parameters and Values

``` javascript  

media_filters: {  
   links: boolean | undefined,  
   images: boolean | undefined,  
   videos: boolean | undefined  
   media: boolean | undefined // for both kind (Image and Video)  
   vine: boolean | undefined  
}

query_filters: {  
   to: string | undefined, // pass twitter username
   from: string | undefined, // pass twitter username
   retweets: boolean | undefined,  
   replies: boolean | undefined,  
   verified: boolean | undefined  
}

options: {
   include_entities: boolean | undefined,
   count: number | undefined,
   result_type: string | undefined,
   lang: string | undefined,
   until: string | undefined, // Date format: YYYY-MM-DD
   tweet_mode: string | undefined, // If value is passed it should be extended.
   geocode: {
      latitude: number,
      longitude: number,
      radius: number,
      matric: string,
   } // Object | undefined
}
```

Here, where undefined is mentioned it states that one can ignore that parameter.

---

### How To

1. How to search for word group:
   To search **google developers club**, pass `'"google developers club"'`
   - Pass keywords wrapped around double quotes
   - What signle quotes do is consider *"google developers club"* as a string
   - Double quotes are for internal recognition of grouping

2. How to search for multiple words:
   To search tweets containing __node__ and __express__
   - If we want both hashtags: `node AND express` or `node express`
   - If we want any hashtag (or both): `node OR express`

2. How to search exclude word:
   To search tweets containing __mongo__ and exclude __mysql__
   - If we want to exclude word _mysql_ pass: `mongo -mysql` 

3. How to search for multiple hashtags:  
   To search tweets containing __#javascript__ and __#webdev__
   - If we want both hashtags: `#javascript AND #webdev` or `#javascript #webdev`
   - If we want any hashtag (or both): `#javascript OR #webdev`

Note: If you write `@username` in search_keywords it will give you tweets in which user was mentioned.

---

### TODO

- [ ] Add More Filters
- [ ] Add Test
- [ ] Add Comments
- [ ] More Documentation
- [x] Base Upload
- [x] Some Filters
- [x] Basic Github Automation
- [x] Manual Testing

---

If you want to learn more about these filters and parameter you can read my [Introduction to Twitter API](https://blog.learncodeonline.in/introduction-to-twitter-api) blog or official Twitter API [Documentation](https://developer.twitter.com/en/docs/twitter-api/v1/tweets/search/guides/standard-operators).