const mogoose= require('mongoose')
const express = require('express');
const cors = require('cors')
const User = require('./models/user')
const port = process.env.PORT || 3000;

const app = express();
app.use(cors())
app.use(express.json())

const url='Mongo URI'
const connect = mogoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => {
        console.log('MongoDB Connected...')
    })
    .catch( (err) => {
        console.error(err);
    })

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			firstName: req.body.firstName,
      lasttName: req.body.lastName,
			email: req.body.email,
			password: newPassword,
		})
		res.status(200).json({succes:true})
	} catch (err) {
		res.status(400).json({succes:false,err})
	}
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
 });