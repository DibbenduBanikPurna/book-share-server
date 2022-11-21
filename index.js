const express=require('express')
const cors=require('cors')
const ObjectId = require('mongodb').ObjectId

const { MongoClient, ServerApiVersion } = require('mongodb');

const app=express();



//middleware
app.use(cors())
app.use(express.json())
//app.use(fileUpload())


////mongouri
const uri = `mongodb+srv://purna:2470purna@cluster0.z2een.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//console.log("database connected")


app.get('/',async(req,res)=>{
    res.send("Welcome TO Book Sharing App");
})



async function run() {
    try {
        await client.connect();
        const database = client.db('book-sharing');
         const bookCollcetion = database.collection('books');
     const usersCollcetion = database.collection('users');
        // const doctorsCollcetion = database.collection('doctors');

        console.log("database connected")


        //  app.post('/allbooks', async (req, res) => {
        //      console.log(req.body)
        //      const docs = req.body.book
        //      const options = { ordered: true };
        // const result = await bookCollcetion.insertMany(docs,options);
        // //     console.log(result)
        //     res.json(result)
        //  })

            //post data data

       app.post('/books',async(req,res)=>{
        console.log(req.body)
        const result = await bookCollcetion.insertOne(req.body)
             console.log(result)
             res.json(result)
       })

       app.get('/books', async(req,res)=>{
          const cursor = bookCollcetion.find({})
             const result = await cursor.toArray()
             res.send(result)
       })


       app.get('/bookdata/:id',async(req,res)=>{
                console.log(req.params.id)
    
                 const result = await bookCollcetion.findOne({ _id: ObjectId(req.params.id) })
                 res.send(result)
             })
        
        //post user data

    //     app.post('/users', async (req, res) => {
    //         const user = req.body;
    //         const result = await usersCollcetion.insertOne(user)
    //         console.log(result)
    //         res.json(result)
    //     })

        

                
            


    //     // })
    //     console.log("database connected");
       
    //     //get book data
    //     app.get('/bookissue',async(req,res)=>{
    //         const cursor = bookCollcetion.find({})
    //         const result = await cursor.toArray()
    //         res.send(result)
    //     })
      
    //     //get user data
    //     app.get('/user',async(req,res)=>{
    //         const cursor = usersCollcetion.find({})
    //         const result = await cursor.toArray()
    //         res.send(result)
    //     })

    //     //recive single book student data

    //     app.get('/bookdata/:id',async(req,res)=>{
    //         console.log(req.params.id)

    //         const result = await bookCollcetion.findOne({ _id: ObjectId(req.params.id) })
    //         res.send(result)
    //     })

        
    //     app.get('/book/:roll', async(req,res)=>{
    //         const result = await bookCollcetion.findOne({student_id: req.params.roll })
    //         res.send(result)
    //         console.log(result)

    //     })
    //     //recived book info
    //     app.put('/bookdata/:id',async(req,res)=>{
    //         const user = req.body;
    //         console.log(req.body)
    //         console.log(req.params.id)
    //                 const filter = { _id: ObjectId(req.params.id)}
    //                 console.log(filter)
    //                 const updateDoc = { $set: { recieve: req.body.currentDate } };
    //                 console.log(updateDoc)
    //                 const result = await bookCollcetion.updateOne(filter, updateDoc);
    //              console.log(result)
    //              res.json(result)
    //     })
      


        
    //    const saveUser = (email, displayName, method) => {

    //     const user = { email, displayName };
    //     fetch('http://localhost:5000/users', {
    //         method: method,
    //         headers: { 'content-type': 'application/json' },
    //         body: JSON.stringify(user)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //         })

    // }

      
       
     
      

    } finally {

        // await client.close();
    }
}


run().catch(console.dir);
app.listen(5000,()=>{
    console.log("server starts");
})