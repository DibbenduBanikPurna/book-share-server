const express = require('express');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const fileUpload = require('express-fileupload');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Mongo URI and Client Setup
const uri = `mongodb+srv://purna:2470purna@cluster0.z2een.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

async function run() {
  try {
    console.log("Attempting to connect to MongoDB...");
    await client.connect();
    console.log("Connected to MongoDB successfully.");

    const database = client.db('book-sharing');
    const bookCollection = database.collection('books'); // Corrected typo
    const usersCollection = database.collection('users'); // Corrected typo

    console.log("Database collections initialized.");

    // Root Endpoint
    app.get('/', async (req, res) => {
      res.send("Welcome TO Book Sharing App");
    });

    // Add a new book
    app.post('/books', async (req, res) => {
        try {
            console.log("POST /books request received.");
    
            // Log all incoming request body data
            console.log("Request body:", req.body);
    
            const { name, email, dept_name, book, author_name, book_title, publisherName } = req.body;
    
            // Temporarily skip image processing
            let imageBuffer = null;
    
            if (req.files && req.files.image) {
                console.log("Image file detected.");
                const image = req.files.image;
                const picData = image.data;
                const encodedPic = picData.toString('base64');
                imageBuffer = Buffer.from(encodedPic, 'base64');
            } else {
                console.log("No image file uploaded.");
            }
    
            const bookInfo = {
                name,
                email,
                dept_name,
                book,
                author_name,
                book_title,
                publisherName,
                image: imageBuffer // Will be `null` if no image is provided
            };
    
            // Attempt to insert into the database
            const result = await bookCollection.insertOne(bookInfo);
            console.log("Insert result:", result);
    
            res.json(result);
        } catch (error) {
            console.error("Error inserting book:", error);
            res.status(500).send({ message: "Failed to add book" });
        }
    });
    

    // Get all books
    app.get('/books', async (req, res) => {
      try {
        console.log("GET /books request received.");
        const cursor = bookCollection.find({});
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send({ message: "Failed to fetch books" });
      }
    });

    // Get a book by ID
    app.get('/bookdata/:id', async (req, res) => {
      try {
        console.log(`GET /bookdata/${req.params.id} request received.`);
        const result = await bookCollection.findOne({ _id: ObjectId(req.params.id) });
        res.send(result);
      } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).send({ message: "Failed to fetch book" });
      }
    });

  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

// Call the run function to initialize the database connection and set up routes
run();

// Start the Express server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
