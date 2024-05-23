require('dotenv').config();
const { connect, connection } = require('mongoose');

const databaseConnection = async () => {
    try {

        connection.on('error', async (err) => {
            console.log(`Mongo Engine is down ${process.env.NODE_ENV}`);
        });

        connection.on('connected', () => {
            console.log(`Mongo Engine is up on ${process.env.NODE_ENV}`);
        });


        await connect(process.env.MONGODB_URL);
        return connection;

    } catch (error) {
        console.error("MongoDB Connection Error : ", error);
        return;
    }
};

module.exports = databaseConnection;