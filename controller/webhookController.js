import { connectDB } from "../config/db";


let insertQuery;

export const webhook= async(req, res) => {

    const id=req.body.external_delivery_id;
    const eventType = req.body.event_name;

    switch (eventType) {
        case 'DELIVERY_CREATED':
            insertQuery= `UPDATE delivery SET status=CREATED, dasher_id=${req.body.dasher_id}, dasher_name=${req.body.dasher_name} WHERE external_delivery_id=${id}`;
            break;

        case 'DASHER_CONFIRMED':
            insertQuery= `UPDATE delivery SET status=DASHER_CONFIRMED WHERE external_delivery_id=${id}`;
            break;

        case 'DASHER_CONFIRMED_PICKUP_ARRIVAL':
            insertQuery= `UPDATE delivery SET status=DASHER_ARRIVED_AT_PICKUP WHERE external_delivery_id=${id}`;
            break;

        case 'DASHER_PICKED_UP':
            insertQuery= `UPDATE delivery SET status=DELIVERY_PICKED_UP, pickup_time=${req.body.pickup_time_actual}  WHERE external_delivery_id=${id}`;
            break;

        case 'DASHER_CONFIRMED_DROPOFF_ARRIVAL':
            insertQuery= `UPDATE delivery SET status=DASHER_ARRIVED_AT_DROPOFF WHERE external_delivery_id=${id}`;
            break;

        case 'DASHER_DROPPED_OFF':
            insertQuery= `UPDATE delivery SET status=DELIVERED, dropoff_time=${req.body.dropoff_time_actual} WHERE external_delivery_id=${id}`;
            break;

        case 'DELIVERY_CANCELLED':
            insertQuery= `UPDATE delivery SET status=CANCELLED WHERE external_delivery_id=${id}`;
            break;
    }

    const DB= await connectDB();
    await DB.execute(insertQuery);
    console.log("krdiya webhook ka data update");
    await DB.end();

    res.status(200).send('Webhook processed successfully');
};
