export default function transformer(Info, image) {
  let datacopy = Info;
  //beer
  datacopy.beer.abv = parseInt(datacopy.beer.abv, 10)
  datacopy.beer.og = parseInt(datacopy.beer.og, 10)
  datacopy.beer.ibu = parseInt(datacopy.beer.ibu, 10)
  datacopy.beer.calories = parseInt(datacopy.beer.calories, 10)
  datacopy.beer.volume = parseInt(datacopy.beer.volume, 10)
  //infopost
  datacopy.infoPost.rating = 5
  datacopy.infoPost.stock = parseInt(datacopy.infoPost.stock, 10)
  datacopy.infoPost.username = "TestUser"
  //countables
  datacopy.countable.price = parseFloat(datacopy.countable.price)
  datacopy.countable.discount = parseInt(datacopy.countable.discount, 10)
  datacopy.infoPost.image = image;
  return datacopy
}

export function transformEdit(Info, id, image) {
  let firstStep = transformer(Info, image)
  firstStep.postId = parseInt(id, 10)

  return firstStep
}

