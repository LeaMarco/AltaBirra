let beers: {
  Name: string;
  description: string;
  alcohol: number;
  price: number;
  ibu: number;
  review: number;
  image: string;
};

function paginated(model: Array<typeof beers>, page: number) {
  const limit: number = 10;
  const start: number = (page - 1) * limit; // start = 1
  const end = page * limit;
  const pages = Math.round(model.length / limit);
  const result: any = { pages: pages };

  if (end < model.length) {
    let aja = page + 1;
    result.next = {
      page: `https://altabirra.herokuapp.com/beers?page=${aja}`,
      limit: limit,
    };
  }
  if (start > 0) {
    let aja = page - 1;
    result.previous = {
      page: `https://altabirra.herokuapp.com/beers?page=${aja}`,
      limit: limit,
    };
  }
  result.results = model.slice(start, end);
  return result;
}


export default paginated;