const express = require('express')

const app = express()

const fs = require('fs');
const path  = require('path')

app.use(express.json())

function readJson(){
  return  JSON.parse(fs.readFileSync(path.join(__dirname,'users.json'),'utf-8'))
}

app.get('/api/users',(req,res)=>{

  const j = readJson()

  res.json(j)

})


app.get('/user/:id',(req,res)=>{

  const id = Number(req.params.id)

  if (isNaN(id)) return res.status(500).send('id not valid') 

  const j = readJson().find(x=>x['id'] ==id)

  if (!j) return res.send(`<h1>no user with id ${id}</h1>`)

  const html = fs.readFileSync(path.join(__dirname,'index.html'),'utf-8').replace(`{info}`,JSON.stringify(j))

  res.send(html)


})


app.get('/api/users/filter',(req,res)=>{

  const minAge = Number(req.query.minAge)
    const maxAge = Number(req.query.maxAge);

  if (isNaN(minAge)) return res.status(500).send('no minAge')
   if (isNaN(maxAge)) return res.status(500).send('no maxAge');


   const users = readJson().filter(x => x['age'] >= minAge && x['age'] <= maxAge);

   return res.json(users)




}
)

app.get('/api/users/:id',(req,res)=>{

  const id = req.params.id
  if (id == undefined){
    return res.status(500).send('no id')
  }

  const j = readJson()

  const user = j.find(x=>x['id'] == id)

  if (!user){
    return res.status(404).send('user not found')
  }


  res.json(user)


})


app.listen('8000',()=>{
  console.log('http://localhost:8000')
})