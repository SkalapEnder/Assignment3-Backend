
# Assignment 3 | Alisher Berik | IT-2308

This assignment is about PC parts. 
In there, you can search specific GPU from large dataset of GPUs
Also, check news about computers, GPU and so on.


## Deployment

The server was deployed on Render's website. Click next link to move:

https://assignment3-backend-6dm6.onrender.com


## Demo

Instruction to use website

### Login & Registration

First of all, you need to create account. 

#### 1) Move to "Log In" link on Navbar.

#### 2) Then click "Create new accout".

#### 3) There you write name, email, password and your role. 
  If you want to be admin, write code that I send you in teams!

#### 4) After Registration, you will move to log in. Again, write your username and password.

### News Part

On each card of news, you have 2 buttons:

#### 1) Read more - move you to real news page

#### 2) Add to favorites - move specific news to favorite storage. There you can store your news.

#### 3) Below, you will see that news articles was paginated into several pages.

### GPU Part

1) Write on input model of your desired GPU. Then below select will be updated and provide suggested GPUs.

2) After clicking one of them, right of you will appears technical data about GPU (Model, Identificator, Memory Size & Type and so on)

#### Click "Search" button to start searching same products in Amazon. After few seconds, below will appear relevant product. Press "Read more" to move to product's page.



## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```

Extract GitHub repository to my-project folder.

Next, Open project folder in IDE.

Then, open terminal of IDE and write next commands

```bash
  npm i express express-session mongoose mongodb axios body-parser ejs -g nodemon bcryptjs
```

Finally, start local server by next commands

```bash
  nodemon index
```
    
## Documentation

There I numerate used libraries

### Used libraries
1. Nodemon - automatically update server if detects any changes in files
2. Express - build more flexible web application
3. Express Session - create user's session to keep its data (ID, username)
4. Mongoose - library to connect with MongoDB Atlas
5. Axios - request and response part
6. Body Parser - extended JSON Parser
7. EJS - allows to use JS script in HTML, include templates and so on.

### Used APIs

1. [GPU API](https://github.com/voidful/gpu-info-api?tab=readme-ov-file)

2. [Amazon API](https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-amazon-data/playground/endpoint_369599f7-6147-4cb9-9417-09dcd429936d)

3. [News API](https://newsapi.org/docs)