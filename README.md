 WebPack
 This is a Simple Webpack installation

 **Instruction to Install WebPack**

 Before we go for Installing WebPack lets Start with Installing Node Modules with the Command:

 npm install

 **Prerequisites**
 You will need to have Node.js installed on your machine and available from your terminal. Installing Node will automatically install npm as well, which is what you will use to install Babel.

Open up your terminal of choice. If you see version numbers when running the two commands below (your numbers will likely be different than this example) then you are ready to go:

_node --version
> v15.5.0_

_npm --version
> 7.16.0_
> 
You will want to have at least a basic understanding of Javascript. We don't deal with any complicated code in this tutorial, but we'll assume you can comfortable read simple programs. webpack's configuration file is written in JS format.

We will assume you have the ability to run a local server and test the HTML/JS code we are using. If not, then check out this tutorial first:

https://dev.to/alexeagleson/understanding-the-modern-web-stack-running-a-local-web-server-4d8g

**Initializing the Project**

Let's start by initializing a new npm project. Run the following command to generate one:

**npm init -y**

The -y flag will automatically select default values for everything, which is appropriate in our example.

We'll start by creating an HTML entry point where we can load and test our bundle. Any basic HTML template will work. Create a file called index.html in your root directory. If you are using VS Code you can generate an instant template by opening the file and typing ! (then click ! menu).

Otherwise we can use the template below:

**index.html**

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>

Next we will create a directory called src. in the root directory of your project. Inside that directory we will have a file called script.js with the following code:

**src/script.js**
function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}
document.body.appendChild(component());

(You will notice that at this beginning stage we are essentially following along with webpack's own fantastic Getting Started guide. webpack's documentation is known for being extremely high quality thanks to its amazing contributors.)

You may notice that we are using a Lodash function inside our script.js file. That's the little _ underscore variable with the join() method. Might be a bit of a simplistic example, but you can replace it with any scenario you can imagine where you might want to use the benefit of an external library function rather than coding it yourself.

Since we are using Lodash in our file, we'll need to add it to our project. From the root directory run the following terminal command:

npm install lodash

Now your directory structure should look like this:

root
│   index.html
|   package.json
└───node_modules
└───src
│   │   script.js

Next we need to load both our script.js file and the Lodash library into out index.html to see everything work together. Update your index.html file like so:

index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Webpack Example</title>
    <script src="node_modules/lodash/lodash.min.js"></script>
    <script src="src/script.js" defer></script>
  </head>
  <body></body>
</html>

Make sure to notice a couple about our script tags. script.js must be prefixed with src/ as it is in that directory, and since our JS is working with the DOM, we want to use the defer attribute so that it doesn't load until after the HTML is finished parsing.

At this point you can serve up your root directory and you should be able to see the following result:

![image](https://github.com/Jananijana2712/WebPack/assets/144465746/ecb1674a-ab2e-41b8-bbb7-c47a68f2c8fc)

That's where webpack comes in.

**Installing Webpack**

npm install webpack webpack-cli --save-dev

Let's take a look at what each one is doing:

webpack - This is the main engine of webpack, it understands everything related about how the code and files relate to one another, and how to bundle them into a single package.

webpack-cli - This is the actual program we are going to run to trigger the core engine. It allows us to run webpack on our command line and generate a bundle.

Our first goal will be to simply configure webpack to process our script.js file and output it without doing any transformations. We'll add those in soon after.

Create a new file in the root directory called webpack.config.js with the following code:

**webpack.config.js**
const path = require("path");

module.exports = {
  mode: "none",
  entry: "./src/script.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};

Before we fun this, let's look at what we expect it will do:

mode - This determines what kind of extra processing is done to your output file.

none - No extra processing at all. We are using this for the tutorial because it makes the output file cleaner for a human to read and understand.
development - Extra work done to add features that make debugging and tracing issues easier. Will be slower and result in larger file sizes. Designed only to be used during development.
production - Removes all unnecessary code and only produces the smallest and leanest file possible. Designed for your release build.
entry - The starting point of our app, it's pointing to our script.js file with our Javascript code

output - This is the name and location of the file it fill generate after all the bundling is done. This is the file our index.html file will load. Includes both the name of the file and path. We are going to output everything into a directory called dist

Let's run webpack now and see if our assumptions are true. ON your terminal run:

npx webpack

We don't need any arguments with that command because it gets all the config information it needs automatically from your webpack.config.js file. At this point you should see a file generated called main.js in your dist folder that looks nearly identical to your script file.

The idea is that your entire project gets bundled into the dist directory and that is what you upload to your server as your release build. OUr issue right now however is that neither your index.html nor your node_modules folder existed in your dist folder. If you tried to release your project now there would be nothing to load.

We will start by configuring webpack to bundle your index.html in your output. We could technically just copy it in there ourselves, but of course webpack has its own way of handling that. This is where we introduce our first plugin.

**Webpack Plugins**

Plugins are code that give webpack additional information about how to perform certain tasks. The most common one you will use is called HtmlWebpackPlugin. Its purpose is exactly as we described above, to let you include an HTML file in your output bundle.

Before we can use it, we have to add it to our project. Run the following command:

npm install html-webpack-plugin --save-dev

Once that is installed we update our webpack config file:

**webpack.config.js**

const HtmlWebpackPlugin = require("html-webpack-plugin"); // <-- NEW
const path = require("path");

module.exports = {
  mode: "none",
  entry: "./src/script.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
};

Two new lines have been added indicated with the "NEW" comments. We need to first require the plugin, and then add it to our config.

We are also going to move our index.html file into our src directory. The src directory will be the location of all our source code related to the web application itself. Config files can continue to live in the project root directory. When we move the index file we are going to update and remove a couple of the script tags.

Our new file looks like:

**src/index.html**

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Webpack Example</title>
  </head>
  <body></body>
</html>

The only different here is that we have removed the two <script> tags with our script.js and the Lodash library. We'll see why in a moment. Before we run let's confirm the shape of our project directory:

root
|   package.json
|   webpack.config.js
└───node_modules
└───src
│   │   script.js
|   |   index.html
└───dist
|   |   main.js

Now let's run our npx webpack command again and take a look at the output.

Inside your dist directory thanks to our new plugin you should see an index.html file. It will look the same as your template with one exception.
_...
<script defer src="main.js"></script>
..._
HtmlWebpackPlugin has automatically added that script tag for you based on the output filename in your webpack.config.js file. Pretty cool!

Now you can update your HTML template in your src directory any time you like, and a copy will be generated on webpack run that automatically points to your bundle.
