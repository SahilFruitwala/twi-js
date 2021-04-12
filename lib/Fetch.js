const fs = require("fs");

const fetch = require("node-fetch");

const TwitterError = require("./Error");

const findLowest = (tweets) => {
  let lowest = -1;
  for (tweet of tweets) {
    if (lowest === -1) {
      lowest = tweet.id;
    } else {
      if (tweet.id < lowest) {
        lowest = tweet.id;
      }
    }
  }
  return lowest + 1;
};

const getData = async (searchQuery, token, pages) => {
  const final_data = [];
  let max_id = undefined;
  let data = {};
  let count = 0;
  let temp = 0;
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    while (temp < pages) {
      const url = !max_id
        ? `https://api.twitter.com/1.1/search/tweets.json?q=${searchQuery}`
        : `https://api.twitter.com/1.1/search/tweets.json?max_id=${max_id}&q=${searchQuery}`;

      const response = await fetch(url, options);

      data = await response.json();
      temp += 1;

      if (data.hasOwnProperty("errors")) {
        if (data.errors.length === 1 && data.errors[0].code === 88) {
          console.log("Rate limit exceeded!");
          temp -= 1;
          console.log("Waiting for 15 min...");
          await new Promise((resolve) => {
            setTimeout(resolve, 900000);
          });
          console.log("Started Again...");
        } else {
          throw new TwitterError(data.errors[0]);
        }
      }
      if (data.hasOwnProperty("statuses")) {
        final_data.push(...data.statuses);
        max_id = findLowest(data.statuses) + 1;
        count += data.search_metadata.count;
      }
    }
    if (data !== {} && data.hasOwnProperty("search_metadata")) {
      if (data.search_metadata.hasOwnProperty("count")) {
        data.search_metadata.count = count;
      }
      data.search_metadata.pages = pages;
    }
    fs.writeFile(
      "Tweets.json",
      JSON.stringify({ tweets: final_data, metadata: data.search_metadata }),
      {
        encoding: "utf-8",
      },
      (err) => {
        if (err) {
          throw new TwitterError({
            message: "Error while writing file!",
            detail: err,
          });
        } else {
          console.log("Tweets are stored in Tweets.json file.");
        }
      }
    );
  } catch (error) {
    console.log("Internal Package Error Message: " + error.message);
    if (error.code) {
      console.log("Internal Package Error Code: " + error.code);
    }
    if (error.detail) {
      console.log("Internal Package Error Detail: " + error.detail);
    }
  }
};

module.exports = getData;
