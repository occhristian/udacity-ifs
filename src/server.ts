import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

    app.get( "/filteredImage", async ( req, res ) => {
      let { image_url } = req.query;
      if(!image_url){
        res.status(400).send(`<p>There is an error in the way you are using the software.</p>`+
          `<p>Please use the syntax: <code style="background: #403f3d; color: whitesmoke; padding: 7px; border-radius: 3px">`+
          `/filteredImage?image_url=<span style="color: orange">enter_url_here</span></code></p>`);
      }
      filterImageFromURL(image_url)
        // .then(image_path => console.log(image_path))
      .then(image_path => {
        res.sendFile(image_path);
      });
    });

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    let homePage = `<div style="width: 90%; margin: 0 auto;">`+
    `<h1 style="border-bottom: 10px double #403f3d">Image Filter Software Submission for Udacity/ALX Cloud Dev Course</h1>`+
    `<h2>How to use:</h2>`+
    `<p><span style="color: maroon; font-weight: bold;">Picsum.photos</span> is a random image generator, like lorem ipsum text.</p>`+
    `<p>This application generates a random image, resizes it, adjusts the image quality, and finally, converts it to grayscale</p>`+
    `<p>To make it easier for you to get a picture, I have included a button below. One click to make magiki! &#123510;</p>`+
    `<p>Made with &#128147; by <a target="_blank" href="https://christian.4thplug.com" style="color: maroon; font-weight: bold;">O. C. Christian</a> &#128640</p>`+
    `<a href="http://udacity-c2-ifsc.us-east-1.elasticbeanstalk.com/filteredImage?image_url=https://www.picsum.photos/400" `+
    `style="display: inline-block; background: #403f3d; padding: 10px; text-decoration: none; color: whitesmoke; border-radius: 3px; font-size: 2rem;">Generate Image &#128070;</a>`+
    `</div>`;
    res.status(200).send(homePage)
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();