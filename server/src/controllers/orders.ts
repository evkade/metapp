import { OrderModel } from "../models/orderSchema";
import { Order } from "../models/interfaces";

export async function getOrders(bar: string | any): Promise<Order> {
  console.log(bar);
  const data = await OrderModel.find({ bar: bar }, (err, orders) => {
    if (err) throw new Error("");
    else return orders;
  }) // @ts-ignore
    .clone()
    .catch((err: Error) => console.log(err));

  console.log(data);

  return data;
}

export async function addOrder(order: Order): Promise<Order> {
  const insertedOrder = await new OrderModel(order);
  insertedOrder.save();
  return insertedOrder;
}

export async function makeBeverage(
  drinkId: String,
  timeMade: String
): Promise<void> {
  await OrderModel.findByIdAndUpdate(
    drinkId,
    { made: true, timeMade: timeMade },
    (err) => {
      if (err) throw new Error("");
    }
  ) // @ts-ignore
    .clone()
    .catch((err: Error) => console.log(err));
}

export async function payForBeverage(
  drinkId: String,
  timePaid: String
): Promise<void> {
  await OrderModel.findByIdAndUpdate(
    drinkId,
    { paid: true, timePaid: timePaid },
    (err) => {
      if (err) throw new Error("");
    }
  ) // @ts-ignore
    .clone()
    .catch((err: Error) => console.log(err));
}
