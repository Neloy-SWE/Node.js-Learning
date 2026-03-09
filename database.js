import { MongoClient } from 'mongodb';

const url = "mongodb+srv://neloyswe:nodeLearning@nodeproject.pxasein.mongodb.net/";
const client = new MongoClient(url);

const dbName = "test_db";

async function main() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('User');


    const newUser = {
        firstName: 'John',
        lastName: 'Doe',
        city: 'New York',
        age: 30,
    }

    // create
    // const insertResult = await collection.insertOne(newUser);
    // console.log('Inserted document =>', insertResult);

    // read
    // const findResult = await collection.find({}).toArray();
    // console.log('Found documents =>', findResult);

    // count
    // const count = await collection.countDocuments();
    // console.log('Total documents in collection =>', count);

    // update
    // const ageInfo = {age: 30};
    // const updateAge = {
    //     $set: {
    //         phoneNumber: "01999883344", // adding new field
    //     }
    // };

    // const updateResult = await collection.updateOne(ageInfo, updateAge);
    // console.log('Updated document =>', updateResult);

    // delete/remove
    // const deleteInfo = {noName: "okay"};
    // const deleteResult = await collection.deleteMany(deleteInfo);
    // console.log('Deleted document =>', deleteResult);

    // filter
    const filterResult = await collection.find({firstName: "John"}).toArray();
    console.log('Filtered documents =>', filterResult);


    return 'done.';

    /**
     * we can see in the db that, the documents are not same. we can store documents with different structure in the same collection.
     */
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());