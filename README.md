# BlocHacks2018
Hackathon project for Blochacks2018

## Useful links:

* [Summary](#summary)
* [Demo](#demo)
* [Running your project](#run)

## <a name="summary"></a> Summary:

As a team consisting of mostly 1st and 2nd generation immigrants, the refugee crisis happening in various regions across the globe is something we hold at heart. Compatriot allows users to create a direct relationship with individuals, groups and organizations of refugees to strengthen their personal bonds with them. Donors can create a Compatriot account to have access to full posts and stories and can send supportive messages and donate for causes of their choosing. Urgent community refugee cases will be written by representative volunteers and will be given priority on the main page. Refugees have the option of creating a page with their personal stories. 

## <a name="demo"></a> Demo:

### Landing page

The landing page is separated into 3 sections:
- Slogan and shortcuts: showcases our reasoning and purpose behind making the website.

![](/public/css/res/slogan.png?raw=true)

- "Most in Need" slideshow: features the cases that need the most attention.

![](/public/css/res/mostInNeed.png?raw=true)

- Stories: features all the stories based on date.

![](/public/css/res/stories.png?raw=true)

### Profile pages

There are 2 types of profiles:
- Donor: This profile is made to support refugees by either monetary donations or 
by helping the case gain more popularity through the "support" function.

- Migrant: This profile is for migrants to display their stories and what they need help with.

Personal profile view:

![](/public/css/res/personalProfile.png?raw=true)

Non-Donor view:

![](/public/css/res/nonDonorView.png?raw=true)



Note: Both types of account can modify their profile pictures and posts.

### Login/SignUp

An interface for newcomers to join the community and for users to reconnect.

![](/public/css/res/signup.png?raw=true)


## <a name="run"></a> Running our project:

#### Dependencies:
* [Node.js v8+ (and npm)](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)

#### Set-up:
Clone repository and `cd` into it.

Run the following:
```
$ mongod
```
And leave it open in its own terminal.

In another terminal, run:
```
$ npm install && npm start
```

In your browser, open [localhost:3005](localhost:3005)