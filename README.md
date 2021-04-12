# Twi-JS

## Installation

```bash
npm install twi-js
```

## Loading and configuring the module

```javascript
// CommonJS
const fetch = require("twi-js");

// ES Module
import fetch from "twi-js";
```

## How to use

#### Main Module

```javascript
const twitter = new Twitter(search_keywords, bearer_token, pages, options);

twitter.fetchData();
```

#### Arguments

1. search_keywords  
    list of all keywords, hashtags 2. and users  
3. bearer_token  
    Beare token   
4. pages  
    number of times you want to search   
5. options  
    options contains lot of filters
