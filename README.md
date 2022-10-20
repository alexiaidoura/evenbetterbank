# evenbetterbank

Capstone project -- continuation of previous projects in class

Mongo-Express-React-Node app 
* MongoDB Cloud/Atlas
* App hosted on Firebase, but I'm getting an error so I will demo both hosted and local to show where I am
* In firebase: evenbetterbank.web.app (need to rename/redirect > Alexia_IdouraFullStackBankingApplication)
* To run locally, download files and set up Node, Express, run from http://localhost:3000/

Basic bank functionality -- create user, log in, view balance, make deposit, make withdrawal, see all accounts 

To do:
* Remove extraneous files from github (the ones that were supposed to be in public, but were dupped out of public)
* Basic log in works, but I want to limit access to other functions based on authentication
  * Ideally, I'd switch to Firebase log in or OAuth. I have started experimenting with both, but got confused with hosting in firebase vs mongodb cloud vs local.
  * Add log out.

Nice to haves:
* Figure out the last step to set UserContext. I'm close. I'll demo. 
* Add API docs.
* Remove secrets from Github
* Use roles -- regular bank customer vs admin who can see all accounts
