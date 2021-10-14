import React from 'react';

export const AdminViewDrinkOrder = ({orders, drinkMade, drinkPaid }) => {

    const currentOrdersCard = (drink) => {
        return (
            <div key={drink.id} className={"drinkCard" + (drink.made ? ' drinkCard--made' : '')} id={"drinkCard#"+drink.id} >
                <p className="drinkCard__text" >Drink name: {drink.drink}</p>
                <p className="drinkCard__text">Quantity: {drink.quantity}</p>
                <p className="drinkCard__text">Ordered by: {drink.user}</p>
                <p className="drinkCard__text">Price per drink: {drink.price}</p>
                <p className="drinkCard__text">Total price: {drink.price * drink.quantity}</p>
                <button className="drinkCard_button" disabled={drink.made} onClick={() => drinkMade(drink.id)} >Ready to serve</button>
                <button className="drinkCard_button" disabled={!drink.made} onClick={() => drinkPaid(drink.id)} >Paid</button>
            </div>
        )
    }

    const finishedOrdersCard = (drink) => {
        return (
            <div key={drink.id} className="drinkCard drinkCard--finished" >
                <p className="drinkCard__text" >Drink name: {drink.drink}</p>
                <p className="drinkCard__text" >Quantity: {drink.quantity}</p>
                <p className="drinkCard__text" >Ordered by: {drink.user}</p>
                <p className="drinkCard__text" >Made at: {drink.timeMade}</p>
                <p className="drinkCard__text" >Made by: {/* Insert user who clicked "done" on drink */}</p>
                <p className="drinkCard__text" >Paid at: {drink.timePaid}</p>
            </div>
        )
    }

    return (
        <>
        <div>
            <h1>View tonight's orders here</h1>
        </div>
        <div>
            <h3>Current orders</h3>
            <div style={{display:'inline', width:'100%'}} >
                {orders.filter(o => !o.made || !o.paid).map(d => currentOrdersCard(d))}
            </div>
        </div>
        <div>
            <h3>Finished orders</h3>
            <div>
                {orders.filter(o => o.made && o.paid).map(d => finishedOrdersCard(d))}
            </div>
        </div>
        </>
    )
};