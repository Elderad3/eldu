import clientPromise from '../../lib/mongodb'

export default async (req, res) => {
  try {
    // connect to the database
    const client = await clientPromise
    let salarioMinimo = await client.db('eldu')
        .collection('salario_minimo')
        .find({})
        .sort({ Ano: 1 })
        .toArray();
    // return the posts
    return res.json({
        data: JSON.parse(JSON.stringify(salarioMinimo)),
       
    });
} catch (error) {
    // return the error
    return res.json({
        message: new Error(error).message,
        success: false,
    });
}
};
