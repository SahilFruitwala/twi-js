# Twi-JS

## Installation

```bash
npm install twi-js
```

## Loading and configuring the module

```javascript
const Twitter = require("twi-js");
```

## How to use

#### Main Module

```javascript
try {
  
  const twitter = new Twitter(search_keywords, bearer_token, pages, options);

  twitter.fetchData();

} catch (error) {
  
  console.log(error);

}
```

#### Arguments

1. search_keywords  
   list of all keywords, hashtags 2. and users
2. bearer_token  
   Beare token
3. pages  
   number of times you want to search
4. options  
   options contains lot of filters

Options Arguments

Options is an object which contains other objects and values. Options contains following properties:

1. media_filters
2. query_filters
3. options
   * include_entities
   * count
   * result_type
   * lang
   * until
   * geocode

Above mentioned all are optional parameters. search_keywords, bearer_token and pages are only required parameters.

---

#### Parameters and their values

``` javascript  

media_filters: {  
   links: boolean | undefined,  
   images: boolean | undefined,  
   videos: boolean | undefined  
}

query_filters: {  
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

### How To:

1. How to search for word group:
   - Pass keywords wrapped around double quotes
   - To search *google developers club*, pass **'"google developers club"'**
   - What signle quotes do is consider *"google developers club"* as a string
   - Double quotes are for internal recognition of grouping

2. How to search for multiple words:
   To search tweets containing _node_ and _express_
   - If we want both hashtags: **node AND express** or **node express**
   - If we want any hashtag (or both): **node OR express**

2. How to search exclude word:
   To search tweets containing _mongo_ and exclude _mysql_
   - If we want to exclude word _mysql_ pass: **mongo -mysql** 

3. How to search for multiple hashtags:  
   To search tweets containing _#javascript_ and _#webdev_
   - If we want both hashtags: **#javascript AND #webdev** or **#javascript #webdev**
   - If we want any hashtag (or both): **#javascript OR #webdev**

If you want to learn more about these filters and parameter you can read the following [blog](https://blog.learncodeonline.in/introduction-to-twitter-api).