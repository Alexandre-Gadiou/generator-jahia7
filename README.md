# generator-jahia7

[![build Status](https://travis-ci.org/Alexandre-Gadiou/generator-jahia7.svg)](https://travis-ci.org/Alexandre-Gadiou/generator-jahia7.svg?branch=master)

**generator-jahia7** is a yeoman generator to set up a jahia template project in 5 minutes. (if nodejs already installed ...)

Difference between generator-jahia7 and generator-jahia is the prototype which is based on [EJS](http://ejs.co) technology.

## Presentation

As we already know, [bootstrap 4 alpha](http://blog.getbootstrap.com/2015/08/19/bootstrap-4-alpha/) moved from LESS to SASS technology.
 
This generator enables to create a **modern** jahia template set project with this packages : 

1. **Bootstrap-SASS 3.3.5**
2. **Font Awesome 4.4.0**
3. **jQuery 3.1.1**

Even if Jahia 7 is more user friendly than Jahia 6.6 for front end development, a project always start with a static HTML prototype.

**generator-jahia7** will create a new folder in your jahia project `src/main/html`. In this folder you 
design your HTML pages with layouts, components ...

## Getting Started

1. Install [nodejs](https://nodejs.org/)

2. Install Gulp
	
	* 	`npm install -g gulp`
		
3. Install Bower
	
	* 	`npm install -g bower`
		
4. Install Yeoman

	* 	`npm install -g yo`	

5. Install [Maven](https://maven.apache.org/install.html)
	

## Installation

1. Download [generator-jahia7](https://github.com/Alexandre-Gadiou/generator-jahia7/archive/master.zip)

2. Install

	* 	`cd generator-jahia7`
		
	* 	`npm link`
		
## Usage	

As promised, you can now generate the jahia project and then start the prototype.

### Project generation

To generate the jahia project, you need to run this command  :

```
yo jahia7
```

Then answer to Mr yeoman questions

### Start the prototype	

You can start the prototype only if you have generated the project before.

To start the prototype, you just need to run this command  :

```
gulp
```

This command creates a new folder `src/main/html/dist` which is browsersynch root (the server).

### Deploy project in jahia

```
mvn clean install jahia:deploy
```
