
const app = require('express')();
const { v4 } = require('uuid');

app.get('/episodios', (req, res) => {
    let episodios = [
        {	
			anime: {
				nome_anime:" Fumetsu no Anata e 2 – Episódios 16 & 17",
				thumbnail:`https://i.redd.it/7ixgte68ioha1.jpg`
			},
			episodio:{
				thumbnail:`https://i.redd.it/7ixgte68ioha1.jpg`
			}
		},

        {	
			anime: {
				nome_anime:"Archmage Transcending through Regression - Capítulo 187",
				thumbnail:`https://i.redd.it/48988k82sqla1.png`
			},
			episodio:{
				thumbnail:`https://i.redd.it/48988k82sqla1.png`
			}
		},


        {	
			anime: {
				nome_anime:"Teste 3",
				thumbnail:`https://i.redd.it/mueb2pcjgbma1.jpg`
			},
			episodio:{
				thumbnail:`https://i.redd.it/mueb2pcjgbma1.jpg`
			}
		},

        {	
			anime: {
				nome_anime:"Teste 4",
				thumbnail:`https://i.redd.it/7plte3g83cla1.png`
			},
			episodio:{
				thumbnail:`https://i.redd.it/7plte3g83cla1.png`
			}
		},
        
        {	
			anime: {
				nome_anime:"Teste 5",
				thumbnail:`https://i.redd.it/rhyscsjjwcla1.png`
			},
			episodio:{
                episodio_id: 1,
				thumbnail:`https://i.redd.it/rhyscsjjwcla1.png`
			}
		}
        
    ]

    episodios = episodios.concat(episodios)
    episodios = episodios.concat(episodios)
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.send(episodios);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

module.exports = app;

/*

const app = require('express')()
const cors = require('cors')
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())
app.get('/episodios', function(req, res){
     
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.end({"message": "Endpoint não encontrado!", "code": 502})
});

app.post('*', function(req, res){
  res.end({"message": "Endpoint não encontrado!", "code": 502})
});

module.exports = app;*/