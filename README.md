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
