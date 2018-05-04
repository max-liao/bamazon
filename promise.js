const mysql = require( 'mysql' );

var config = {
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "root",
    database: "bamazon_DB"}

class Database {
    constructor( conf ) {
        this.connection = mysql.createConnection( conf );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}

var database = new Database(config);

// database.query( 'SELECT * FROM products' ).then( result => {
//     console.log(result);
// } );

module.exports = {database};