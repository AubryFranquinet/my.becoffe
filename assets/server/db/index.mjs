import pg from 'pg'

const { Client } = pg
const client = new Client({
    user: 'aubryf', // Your newly created user
    host: '172.17.0.2',
    database: 'mycoffiedb', // Your newly created database
    password: 'root', // Your newly created password
    port: 5432,
})
client.connect()

//create new user
const createUser = (req, res) => {
    const { name, email, password } = req.body
    const query = {
        text: 'INSERT INTO user(email,password,first_name,last_name,account_type,discord) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
        values: [name, email, password, first_name, last_name, account_type, discord],
    }
    client.query(query, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res.rows)
        }
    })
}

