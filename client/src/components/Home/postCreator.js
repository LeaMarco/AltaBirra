import axios from "axios"

export default async (amount) => {


    let beerName = ["Belgian ipa", "Scottish", "Brown Ale", "Red Ale", "Black Daniels", "Pshyco ipa", "Sweet Golden", "Wild Apa", "Wonca Golden", "American ipa", "Ipa argenta", "Raven Stout", "Shadow stout", "Old School Porter", "Sunshine Apa", "Dang River", "Earth Dock IPA", "Yamquak", "Bigly Bomb Session IPA", "Binglezard Flack", "Jain Is The Dog", "Earth 2 Sanebus", "Tower Of Ergelon", "Toe Deal", "Juicy Dripple IPA", "Flying Rocks IPA", "Yall In Wool", "Earth Pump", "Heaven Cat", "Heart Compost", "Wicked Geee", "Text 5 Of The IPA", "Cockamarin Hard IPA", "Test Tha IPA", "Yampy", "Widee Banger Fripper IPA", "Oarahe Momnila Day Revenge Bass Cornationn Yerve Of Aterid Ale", "The Great Rebelgion", "Trippel Lock", "Thick Back", "The Fraggerbar", "Dankering", "Third Maus", "Sip’s The Stunks Belgian Tripel", "Slambertangeriss", "Third Danger", "Track Of The Wind", "Devil’s Chard", "Spore Of Gold", "The Actoompe", "Brother Panty Tripel", "The Oldumbrett’s Ring", "The Vunker The Finger", "Gunder Of Traz", "Cherry Boof Cornester", "Strange Fast", "Drammnt", "Humple La Bobstore Barrel Aged", "Thrennt Rem Wine Barrel Aged Monkay Tripel", "Snarging Red", "Warmel Halce’s Comput Ale", "Fire Pipe", "Blangelfest", "Stoodemfest", "La Cat Tas Oo Ma Ale", "Ole Blood Whisk", "Frog Trail Ale", "Ricias Donkey Brain", "Sacky Rover", "Gate Rooster", "Cramberhand", "O'Busty Irish Red", "Helusto’s Humpin’ Red", "The Hunty", "Rickin Organic Red Deaath", "River Smush Hoppy Amber Ale", "Rivernillion Amber", "Special North Wish Leifstic Imperial Red", "Ambre O Woo’s Omella Imperial Red Ale", "I The Moon", "The Bopberry Stout", "Cherry Coconut Mint Chocolate Stout", "Black Morning", "Sir Coffee", "Shock State", "Take Bean", "Single Horde", "Whata Stout", "Shany Lace", "Black Sink Stout", "Barrel Aged Chocolate Milksmoke", "Shump", "Morning Dave - Vanilla Coffee Stout", "Avidberry", "Dark Thomblan", "Jrankers Java Stout", "Spulgican’s Chocolate Coconut Pamper", "Cherry Trout Stout", "Bold Oot Stout", "Pimperdiginistic The Blacksmith W/ Cherry Stout"]
    let gtype = ["Rubia", "Roja", "Negra",]
    let stype = ["Amber", "Vino de cebada", "Ale belga", "Ale escocesa", "Duvel", "Porter", "Alt", "Kölsch", "Trappist", "Flanders negra", "Especial", "Cerveza de trigo", "Cerveza blanca", "Pilsner", "Dortumunder", "Viena", "Munich", "Bock", "Rauchbier", "Schwarzbier", "Gueuze", "Faro", "Cerveza de fruta"]
    let usernames = ["TestUser", "TestPremium"]

    for (let i = 0; i < amount; i++) {

        let beer = {
            "name": beerName[Math.floor(Math.random() * (beerName.length))],
            "abv": Math.floor(Math.random() * 20),
            "og": Math.floor(Math.random() * 200),
            "ibu": Math.floor(Math.random() * 80),
            "calories": Math.floor(Math.random() * 20),
            "dryHop": Math.random() > 0.5 ? true : false,
            "volume": 500,
            "genericType": gtype[Math.floor(Math.random() * (gtype.length))],
            "specificType": stype[Math.floor(Math.random() * (stype.length))],
        }

        let infoPost = {
            "title": beer.name,
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus dolores ut consectetur nostrum doloremque numquam labore voluptate quos consequatur enim architecto, laboriosam hic quasi provident cumque reprehenderit aspernatur reiciendis ullam?",
            "image": beer.genericType === "Rubia" ? "https://i.imgur.com/5na1yxo.png" : beer.genericType === "Negra" ? "https://i.imgur.com/5vu4ZIg.png" : "https://i.imgur.com/U7TT4qf.png",
            "rating": Math.ceil(Math.random() * 5),
            "stock": Math.floor(Math.random() * 50),
            "shipping": Math.random() > 0.5 ? true : false,
            "visibility": true,
            "username": usernames[Math.floor(Math.random() * usernames.length)]
        }
        let countable = {
            "price": (Math.random() * 200 + 75).toFixed(2),
            "discount": Math.random() > 0.5 ? 0 : Math.floor(Math.random() * 25)
        }

        let infoToPost = { beer, infoPost, countable }

        await axios.post('http://localhost:3001/post', { params: infoToPost })
    } return ("TERMINE")

}

//////import CreateManyPost from "./postCreator";

/////INVOCARLA DONDE LA QUIERAN USAR CON <button onClick={()=>CreateManyPost(CANTIDAD DE POST QUE QUIERAN)}> CREAR</button>