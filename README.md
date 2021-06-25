# A Back-end practice reference with serverless Azure functions and No-SQL Cosmos DB.

This is a refactoring of the nc-news project (https://github.com/taodtu/nc-news) with **`serverless Azure functions`** and **`No-SQL Cosmos DB`**. With careful design, this refactoring offers a faster and scalable solution to the original express+PSQL design.

Northcoders News is a social news aggregation, web content rating, and discussion website. Northcoders News has articles which are divided into topics. Each article has user curated ratings and can be up or down voted using the API. Users can also add comments about an article. Comments can also be up or down voted. A user can add comments and remove any comments which they have added.the endpoint can be consumed as below:
- "GET /api/topics": "get all the topics",
- "GET /api/users/:username": "get the user by username",
- "GET /api/articles/:article_id": "get the article by its ID",
- "PATCH /api/articles/:article_id": "update the votes of the article",
- "POST /api/articles/:article_id/comments": "Post a comment to the article by ID",
- "GET /api/articles/:article_id/comments": "get all comments to a article by article-ID",
- "GET /api/users/:username/comments": "get all comments to a author by username",
- "GET /api/articles": "get all articles in this resource",
- "PATCH /api/comments/:comment_id": "update the votes to a comment by its ID",
- "DELETE /api/comments/:comment_id": "delete a comment by its ID"

![image](https://user-images.githubusercontent.com/37536658/123412488-8c010b00-d5a9-11eb-8717-78826d7b4806.png)


## Features

- Use **`synthetic partition keys`** for each records, so all api calls are hittling directly **`against partition key`** so the response time is very fast.

- Use **`inverted index`** to fit all original **`4 SQL tables`** into a **`single NOSQL table`**.

- A **`secondary table`** is implemented for fast queries.

- **`Performance oriented`**, such as **`Promise.all()`** is used whenever async calls can be run parallelly.

## Installation

- In order to run this project locally, you need to have an Azure account
- git clone https://github.com/taodtu/nc-news-azure.git
- cd nc-news-rest-client/nc-news-azure.
- npm install.
- press "F5" if you are using VS.code.
