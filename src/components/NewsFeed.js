import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

//this is a webscraper for google news ( the rss page - for the pages : top stories , i read and process the xml in my backend
// because of cors , and send it back to front as a json object with array of items ,
// which every item has a title and description ,
// the description itself is a string of html - and although it is goole - a trusted source - i still
// sanitize it before inserting to avoid XSS attacks , i specifically used the library DOMPurify )
// i maually fetches all the topics in google news
// which are [world,local,business,technology,entertainment,sports,science,health]
// this are their id's - i did it manually because there isn't an api for fetching this

const NewsFeed = () => {
  const [currentTopic, setcurrentTopic] = useState('top stories');
  const [currentTopicNews, setcurrentTopicNews] = useState([]);
  const topics = [
    'top stories',
    'health',
    'science',
    'sports',
    'entertainment',
    'technology',
    'business',
    'world',
    'local',
  ];

  const sanitizeHTML = (htmlStr) => {
    return DOMPurify.sanitize(htmlStr, { USE_PROFILES: { html: true } });
  };
  const fetchTopStoriesNews = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/news/${currentTopic}`;
      let res = await fetch(url);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setcurrentTopicNews(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTopStoriesNews();
  }, [currentTopic]);

  return (
    <>
      <select
        className="form-select mb-3 mt-3"
        aria-label="Default select"
        value={currentTopic}
        onChange={(e) => setcurrentTopic(e.target.value)}
      >
        {topics.map((t, index) => {
          return (
            <option value={t} key={index}>
              {t}
            </option>
          );
        })}
      </select>
      <h1> {currentTopic}</h1>
      {currentTopicNews.map((item, index) => {
        return (
          <div key={index}>
            <h6>{item.title}</h6>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHTML(item.description),
              }}
            ></div>
          </div>
        );
      })}
    </>
  );
};

export default NewsFeed;
