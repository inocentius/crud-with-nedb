const express = require("express");
const app = express();
const Datastore = require("nedb");
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const db = new Datastore({ filename: 'data/database.db', autoload: true });
db.loadDatabase();


app.get('/', (req, res)=> {
  res.send('It works')
});

app.get('/students', (req,res)=>{
  db.find({}, (err, data)=>{
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
});

app.get('/students/:id', (req,res)=>{
  db.findOne({_id: req.params.id}, (err, data)=>{
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
});

app.post('/students', (req, res)=>{
  console.log(req.body);
  const name = req.body.name;
  const age = req.body.age;
  const profession = req.body.profession;
  db.insert({
    name: name,
    age: age,
    profession: profession
  })
  res.send('Student data added');
})

app.put('/students/:id', (req, res)=>{
  db.update({_id: req.params.id}, req.body, {}, (err, data)=>{
    if (err) {
      res.send(err);
    } else {
      res.send('Student data updated');
    }
  })
})


app.delete('/students/:id', (req, res) =>{
  db.remove({_id:req.params.id}, {}, err=>{
    if (err) {
      res.send(err);
    } else {
      res.send('Student data deleted');
    }
  });
})

const port = 3000;
app.listen(port, () => {
    console.log(`Running on port ${port} `);
});
