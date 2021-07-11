export default function transformer(Info){
    let datacopy=Info;
    //beer
    datacopy.beer.abv = parseInt(datacopy.beer.abv,10)
    datacopy.beer.og = parseInt(datacopy.beer.og,10)
    datacopy.beer.ibu = parseInt(datacopy.beer.ibu,10)
    datacopy.beer.calories = parseInt(datacopy.beer.calories,10)
    datacopy.beer.volume = parseInt(datacopy.beer.volume,10)
    datacopy.beer.dryHop = "true" ? true : false;
    datacopy.beer.genericType = "Rubia"
    datacopy.beer.specificType = "Duvel"
    //infopost
    datacopy.infoPost.shipping = "true" ? true : false;
    datacopy.infoPost.visibility = "true" ? true : false;
    datacopy.infoPost.rating = 5
    datacopy.infoPost.stock = parseInt(datacopy.infoPost.stock,10)
    datacopy.infoPost.username= "TestUser"
    datacopy.infoPost.img= "image url"
    //countables
    datacopy.countable.price = parseInt(datacopy.countable.price,10)
    datacopy.countable.discount = parseInt(datacopy.countable.discount,10)
  
    return datacopy
  }

  export function transformEdit(Info) {
    let firstStep = transformer(Info)
    firstStep.editId= 1
    return firstStep
    
  }