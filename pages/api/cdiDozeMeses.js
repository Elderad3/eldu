import clientPromise from '../../lib/mongodb'

export default async (req, res) => {
  try {
    // connect to the database
    const client = await clientPromise
    let cdi = await client.db('eldu')
        .collection('cdi')
        .find({ ano: { $gt: 2019}})
        .sort({ ano: 1 })
        .toArray();
    // return the posts
    return res.json({
        data: JSON.parse(JSON.stringify(cdi)),
       
    });
} catch (error) {
    // return the error
    return res.json({
        message: new Error(error).message,
        success: false,
    });
}
};
