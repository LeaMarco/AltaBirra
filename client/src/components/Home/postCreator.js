import axios from "axios"

export default async (amount) => {

    
    let beerName=["Belgian ipa","Scottish","Brown Ale","Red Ale","Black Daniels","Pshyco ipa","Sweet Golden","Wild Apa", "Wonca Golden", "American ipa", "Ipa argenta","Raven Stout","Shadow stout","Old School Porter", "Sunshine Apa"]
    let gtype=["Rubia", "Roja", "Negra",]
    let stype=["Amber","Vino de cebada","Ale belga","Ale escocesa","Duvel","Porter","Alt","Kölsch","Trappist","Flanders negra","Especial","Cerveza de trigo","Cerveza blanca"]
    let prices=[150,120,135,184,154,124,142,134,159,126,147,185,124,153,168]
    let discount=[5,10,15,20,25,0,0,0,0,0,0,0,0,0,0]
    
    for (let i = 0; i < amount; i++) {
        
        let beer= {
            "name": beerName[Math.floor(Math.random()*(beerName.length))],
            "abv": Math.floor(Math.random()*20),
            "og": Math.floor(Math.random()*200),
            "ibu": Math.floor(Math.random()*80),
            "calories": Math.floor(Math.random()*20),
        "dryHop": false,
        "volume": 500,
        "genericType": gtype[Math.floor(Math.random()*(gtype.length))],
        "specificType": stype[Math.floor(Math.random()*(stype.length))],
    }
    
    let infoPost= {
        "title": beer.name,
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus dolores ut consectetur nostrum doloremque numquam labore voluptate quos consequatur enim architecto, laboriosam hic quasi provident cumque reprehenderit aspernatur reiciendis ullam?",
        "image": beer.genericType ==="Rubia"? "https://i.imgur.com/5na1yxo.png" : beer.genericType ==="Negra"? "https://i.imgur.com/5vu4ZIg.png" : "https://i.imgur.com/U7TT4qf.png",
        "rating": Math.floor(Math.random()*5),
        "stock":  Math.floor(Math.random()*50),
        "shipping": false,
        "visibility": true,
        "username": "TestUser"
    }
    let countable= {
        "price": prices[Math.floor(Math.random()*(prices.length))], 
        "discount": discount[Math.floor(Math.random()*(discount.length))]
    }

    let infoToPost={beer,infoPost,countable}

    await axios.post('http://localhost:3001/post', {params:infoToPost})
    .then((e)=>console.log("creado"))
    .catch((e)=>console.log("creado"))
} return ("TERMINE")
    
}

//////import CreateManyPost from "./postCreator";

/////INVOCARLA DONDE LA QUIERAN USAR CON <button onClick={()=>CreateManyPost(CANTIDAD DE POST QUE QUIERAN)}> CREAR</button>