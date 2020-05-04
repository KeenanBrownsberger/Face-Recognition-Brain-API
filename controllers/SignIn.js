const handleSignIn = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('Incorrect form submission.');
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            // console.log(isValid);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        // console.log(user);
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get user.'))
            } else {
                res.status(400).json('Wrong credentials.')
            }
        })
        .catch(err => res.status(400).json('Wrong credentials.'))
    // // Load hash from your password DB.
    // bcrypt.compare("apples", '$2a$10$MYCC9EUZjGYF854x9ftyaOoa8nP1DILAPSb6PSMrXUliNztn3WmdC', function (err, res) {
    //     console.log('First guess.', res)
    //     // res == true
    // });
    // bcrypt.compare("veggies", '$2a$10$MYCC9EUZjGYF854x9ftyaOoa8nP1DILAPSb6PSMrXUliNztn3WmdC', function (err, res) {
    //     console.log('Second guess.', res)
    //     // res = false
    // });
    // if (email === database.users[0].email && password === database.users[0].password) {
    //     res.json(database.users[0]);
    //     // res.json('success');
    // } else {
    //     res.status(400).json('error logging in');
    // }
    // // res.json('signing');
}

module.exports = {
    handleSignIn: handleSignIn
};