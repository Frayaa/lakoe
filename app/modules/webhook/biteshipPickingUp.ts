// import { db } from "~/libs/prisma/db.server";
// import { pickingUp, updateInvoiceStatus } from "./hooks/usePickingUp";
// import axios from "axios";
// import { useLoaderData } from "@remix-run/react";
// import { loader } from "~/routes/order";

// export async function getEmail(payload: any) {
//   const dataInvoice = await db.invoice.findFirst({
//     where: {
//       waybill: payload.courier_waybill_id,
//     },
//     include: {
//       user: true,
//       courier: true,
//     },
//   });

//   return dataInvoice;
// }

// export async function Biteship(payload: any) {
//   try {
//     const dataInvoice = await getEmail(payload);
//   const data = useLoaderData<typeof loader>();

//     // console.log(dataInvoice);

//     // if (!dataInvoice) {
//     //   // Handle the case where dataInvoice is null (no matching record)
//     //   console.log(
//     //     "No matching record found for waybill: " + payload.courier_waybill_id
//     //   );
//     //   return; // Exit the function or perform appropriate error handling
//     // }

//     const email = dataInvoice?.user?.email as string;
//     const name = dataInvoice?.user?.name as string;
//     const waybill = dataInvoice?.waybill as string;

//     // The courier was informed
//     if (payload.status === "allocated") {
//       const orderId = dataInvoice?.courier?.orderId;
//       if (!orderId) {
//         console.log("No orderId found for invoice " + dataInvoice?.id);
//         return;
//       }

//       const biteshipApiUrl = "https://api.biteship.com";

//       const response = await axios.get(`${biteshipApiUrl}/orders/${orderId}`, {
//         headers: {
//           Authorization: data.apiKey,
//         },
//       });

//       const fetchedWaybill = response.data.courier_waybill_id;
//       if (fetchedWaybill) {
//         // Update the waybill in the invoice table
//         await db.invoice.update({
//           where: { id: dataInvoice.id },
//           data: { waybill: fetchedWaybill },
//         });
//         console.log("Waybill updated for " + waybill);
//       } else {
//         console.log("Waybill not found in Biteship response");
//       }

//       console.log("this is payload status: " + payload.status);
//     }

//     // Courier picks up goods
//     if (payload.status === "picking_up") {
//       // Handle 'picking_up' status

//       const existingInvoice = await db.invoice.findFirst({
//         where: {
//           waybill: payload.courier_waybill_id,
//         },
//       });
//       if (!existingInvoice) {
//         console.log(
//           "invoice not found for waybill" + payload.courier_waybill_id
//         );
//       } else {
//         await updateInvoiceStatus(existingInvoice.id);
//       }

//       pickingUp(email, name, waybill);
//       console.log("this is payload status: " + payload.status);
//     }

//     // The goods have been picked up
//     if (payload.status === "picked") {
//       // Handle 'picked' status
//       console.log("this is payload status: " + payload.status);
//     }

//     // Courier on the way to recipient's location
//     if (payload.status === "dropping_off") {
//       // UseDroppingOff(email, name, waybill);
//       console.log("this is payload status: " + payload.status);
//     }

//     // Item successfully recieved
//     if (payload.status === "delivered") {
//       // Handle 'delivered' status
//       console.log("this is payload status: " + payload.status);
//     }

//     // Courier not found
//     if (payload.status === "courier_not_found") {
//       // Handle 'courier_not_found' status
//       console.log("this is payload status: " + payload.status);
//     }

//     // Order cancelled
//     if (payload.status === "cancelled") {
//       // Handle 'cancelled' status
//       console.log("this is payload status: " + payload.status);
//     }

//     // Orders are on hold
//     if (payload.status === "on_hold") {
//       // Handle 'on_hold' status
//       console.log("this is payload status: " + payload.status);
//     }

//     // Orders are disposed
//     if (payload.status === "disposed") {
//       // Handle 'disposed' status
//       console.log("this is payload status: " + payload.status);
//     }

//     //  In process return to sender
//     if (payload.status === "return_in_transit") {
//       // Handle 'return_in_transit' status
//       console.log("this is payload status: " + payload.status);
//     }

//     // The order has been returned to sender
//     if (payload.status === "returned") {
//       // Handle 'returned' status
//       console.log("this is payload status: " + payload.status);
//     }
//   } catch (err) {
//     console.log("error di biteship picking up", err);
//   }
// }
