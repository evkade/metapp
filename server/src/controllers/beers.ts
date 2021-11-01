import { BeerModelDKM, BeerModelMKM } from "../models/beerSchema";
import { Beer } from "../models/interfaces";

export async function getActiveBeers(currentBar: String) {
  const model = currentBar === "dkm" ? BeerModelDKM : BeerModelMKM;

  const data = await model
    .find({ active: true }, "", (err: Error, beers: any) => {
      if (err) return err;
      else return beers;
    }) //@ts-ignore
    .clone()
    .catch(function (err: Error) {
      console.log(err);
    });

  return data;
}

export async function getBeers(currentBar: String) {
  const model = currentBar === "dkm" ? BeerModelDKM : BeerModelMKM;

  const data = await model
    .find({}, "", (err: Error, beers: any) => {
      if (err) return err;
      else return beers;
    }) //@ts-ignore
    .clone()
    .catch(function (err: Error) {
      console.log(err);
    });

  return data;
}

export async function getBeerById(currentBar: String, id: String) {
  const model = currentBar === "dkm" ? BeerModelDKM : BeerModelMKM;
  const data = await model
    .find({ _id: id }, "", (err: Error, beers: any) => {
      if (err) return err;
      else return beers;
    }) //@ts-ignore
    .clone()
    .catch(function (err: Error) {
      console.log(err);
    });

  return data;
}

export async function deleteBeerById(currentBar: String, id: String) {
  const model = currentBar === "dkm" ? BeerModelDKM : BeerModelMKM;
  const data = await model
    .deleteOne({ _id: id }, function (err: Error) {
      if (err) return err;
    }) //@ts-ignore
    .clone()
    .catch(function (err: Error) {
      console.log(err);
    });

  return data;
}

export async function upsertBeer(
  currentBar: String,
  beer: Beer
): Promise<Beer> {
  const model = currentBar === "dkm" ? BeerModelDKM : BeerModelMKM;

  //@ts-ignore
  let upsertedBeer = await model
    .findOneAndUpdate(
      { name: beer.name },
      beer,
      { upsert: true, new: true },
      function (err, doc) {
        if (err) return err;
        else {
          return doc;
        }
      }
    ) //@ts-ignore
    .clone()
    .catch(function (err: Error) {
      console.log(err);
    });

  return upsertedBeer;
}
