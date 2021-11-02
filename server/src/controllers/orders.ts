import { OrderModel } from "../models/orderSchema";
import { Order } from "../models/interfaces";

export async function getOrders(bar: string | any): Promise<Order> {
  const today = new Date();
  var yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const todayString =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const yesterdayString =
    yesterday.getFullYear() +
    "-" +
    (yesterday.getMonth() + 1) +
    "-" +
    yesterday.getDate();

  // @ts-ignore
  const data = await OrderModel.find(
    { bar: bar, date: { $gte: yesterdayString, $lte: todayString } },
    (err: Error, orders: Object | any) => {
      if (err) throw new Error("");
      else return orders;
    }
  ) // @ts-ignore
    .clone()
    .populate("user")
    .catch((err: Error) => { throw err });


  return data.map((order: Order) => {
    return {
      id: order._id,
      order: order.order,
      date: order.date,
      // @ts-ignore
      user: order.user.username,
      made: order.made,
      timeMade: order.timeMade,
      paid: order.paid,
      timePaid: order.timePaid,
      bar: order.bar,
      cancelled: order.cancelled,
    };
  });

}

export async function addOrder(order: Order): Promise<Order> {
  try {
    const insertedOrder = await new OrderModel(order);
    insertedOrder.save();
    return insertedOrder;
  } catch (error) {
    throw error
  }

}

export async function makeBeverage(
  drinkId: String,
  timeMade: String
): Promise<void> {
  try {
    await OrderModel.findByIdAndUpdate(
      drinkId,
      { made: true, timeMade: timeMade },
      (err) => {
        if (err) throw new Error("");
      }
    ) // @ts-ignore
      .clone()
      .catch((err: Error) => { throw err });
  } catch (error) {
    throw error
  }
}

export async function payForBeverage(
  drinkId: String,
  timePaid: String
): Promise<void> {
  try {
    await OrderModel.findByIdAndUpdate(
      drinkId,
      { paid: true, timePaid: timePaid },
      (err) => {
        if (err) throw new Error("");
      }
    ) // @ts-ignore
      .clone()
      .catch((err: Error) => { throw err });
  }
  catch (error) {
    throw error
  }
}

export async function cancelOrder(orderId: String): Promise<void> {
  try {
    await OrderModel.findByIdAndUpdate(orderId, { cancelled: true }, (err) => {
      if (err) return err
    }).exec()
      .catch((err: Error) => { throw err });
  } catch (error) {
    throw error
  }
}

export async function getUserOrders(userId: String | any) {
  const data = await OrderModel.find({ user: userId }, (err, orders) => {
    if (err) throw new Error("Could not fetch from database");
    else return orders;
  }) // @ts-ignore
    .clone()
    .catch((err: Error) => { throw err });

  return data.map((order: any) => {
    return {
      id: order._id,
      order: order.order,
      date: order.date,
      // @ts-ignore
      user: order.user,
      made: order.made,
      timeMade: order.timeMade,
      paid: order.paid,
      timePaid: order.timePaid,
      bar: order.bar,
      cancelled: order.cancelled,
    };
  });
}
