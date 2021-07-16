export default function transformer(Info){
    let datacopy=Info;
    //beer
    datacopy.beer.abv = parseInt(datacopy.beer.abv,10)
    datacopy.beer.og = parseInt(datacopy.beer.og,10)
    datacopy.beer.ibu = parseInt(datacopy.beer.ibu,10)
    datacopy.beer.calories = parseInt(datacopy.beer.calories,10)
    datacopy.beer.volume = parseInt(datacopy.beer.volume,10)
    //infopost
    datacopy.infoPost.rating = 5
    datacopy.infoPost.stock = parseInt(datacopy.infoPost.stock,10)
    datacopy.infoPost.username= "TestUser"
    datacopy.infoPost.image= datacopy.beer.genericType === "Rubia" ? "https://i.imgur.com/5na1yxo.png" : datacopy.beer.genericType === "Negra" ? "https://i.imgur.com/5vu4ZIg.png" : "https://i.imgur.com/U7TT4qf.png";
    //countables
    datacopy.countable.price = parseInt(datacopy.countable.price,10)
    datacopy.countable.discount = parseInt(datacopy.countable.discount,10)
    return datacopy
  }

  export function transformEdit(Info,{id}) {
    let firstStep = transformer(Info)
    firstStep.postId=parseInt(id,10)
    return firstStep
  }