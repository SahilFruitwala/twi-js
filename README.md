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
   until: string | undefined,
   geocode: {
      latitude: number,
      longitude: number,
      radius: number,
      matric: string,
   } // Object | undefined
}
```

Here, where undefined is mentioned it states that one can ignore that parameter.



If you want to learn more about these filters and parameter you can read the following [blog](https://blog.learncodeonline.in/introduction-to-twitter-api).