// import crypto from 'crypto';

// import { json, redirect } from '@remix-run/node';
// import type { LoaderArgs, ActionArgs } from '@remix-run/node';
// import { MootaOrderSchema } from '~/modules/order/order.schema';
// import {
//   MootaOrderStatusUpdate,
//   getAllProductUnpid,
//   // getDataProductReadyToShip,
//   // getInvoiceByStatus,
//   // getProductUnpid,
//   updateInvoiceStatus,
// } from '~/modules/order/order.service';

// import { Flex } from '@chakra-ui/react';
// import { useParams } from '@remix-run/react';
// import { ImplementGrid } from '~/layouts/Grid';
// // import NavOrder from "~/layouts/NavOrder";

// import { db } from '~/libs/prisma/db.server';
// import CanceledService from '~/modules/order/orderCanceledService';
// // import getDataInShipping from "~/modules/order/orderShippingService";
// import { getUserId } from '~/modules/auth/auth.service';
// // import SuccesService from "~/modules/order/orderSuccessService";
// // import NavOrderNew from '~/layouts/NavOrderNew';
// import { getProductUnpidNew } from '~/modules/order/order.servicenew';
// // import OrderSevice from "~/modules/order/orderService";

// export async function loader({ request, params }: LoaderArgs) {
//   // console.log("Request", request);
//   const status = params.status as string;
//   console.log('params :', status);

//   const url = new URL(request.url);
//   let searchTerm = url.searchParams.get('search') as string;
//   let searchFilter2 = url.searchParams.get('searchFilter2') as string;

//   console.log('dapat gak daatanya', searchFilter2);

//   if (!searchTerm) {
//     searchTerm = '';
//   }

//   console.log('searchTerm', searchTerm);

//   const userId = await getUserId(request);
//   if (!userId) {
//     throw redirect('/auth/login');
//   }

//   const dataGet = await getProductUnpidNew(searchTerm, status);
//   const apiKey = process.env.BITESHIP_API_KEY;
//   // const dataProductReadyToShip = await getDataProductReadyToShip();

//   // const canceledService = await CanceledService(searchTerm);
//   const unpaidCardAll = await getAllProductUnpid();
//   // const [unpaidCardAll, unpaidCard, successedService] = await Promise.all([
//   //   getAllProductUnpid(),
//   //   getProductUnpid(),
//   //   SuccesService(),
//   // ]);
//   // const dataInvoice = await getInvoiceByStatus();

//   const role = await db.user.findFirst({
//     where: {
//       id: userId as string,
//     },
//   });

//   if (role?.roleId === '1') {
//     throw redirect('/dashboardAdmin');
//   } else if (role?.roleId === '2') {
//     const dataJson = json({
//       searchTerm,
//       dataGet,
//       unpaidCardAll,
//       // unpaidCard,
//       // canceledService,
//       // successedService,
//       // dataInvoice,
//       // dataShipping: await getDataInShipping(),
//       // dataProductReadyToShip,
//       apiKey,
//     });
//     return dataJson;
//   } else if (role?.roleId === '3') {
//     throw redirect('/checkout');
//   } else {
//     throw redirect('/logout');
//   }
// }

// export async function action({ request }: ActionArgs) {
//   const requestIP = request.headers.get('x-forwarded-for') as string;

//   const formData = await request.formData();
//   const id = formData.get('id') as string;
//   const status = formData.get('status') as string;
//   const actionType = formData.get('actionType') as string;

//   // console.log('yg kamu cari', id, actionType, status);

//   if (actionType === 'updateInvoiceAndHistoryStatusReadyToShip') {
//     // console.log('masuk sini');

//     await db.invoiceHistory.create({
//       data: {
//         status: status,
//         invoiceId: id,
//       },
//     });

//     await db.invoice.update({
//       where: {
//         id: id,
//       },
//       data: {
//         status: status,
//       },
//     });

//     // alert
//     // console.log('Status "READY_TO_SHIP" berhasil dibuat dan diupdate.');
//   }

//   if (isMootaIP(requestIP)) {
//     if (request.method === 'POST') {
//       try {
//         const requestBody = await request.text();

//         const payloads = JSON.parse(requestBody);

//         const secretKey = process.env.MOOTA_SECRET as string;

//         const amount = payloads[0].amount as number;

//         const signature = request.headers.get('Signature') as string;

//         if (verifySignature(secretKey, requestBody, signature)) {
//           const MootaOrder = MootaOrderSchema.parse({
//             amount,
//           });
//           await MootaOrderStatusUpdate(MootaOrder);
//         } else {
//           console.log('error verify Signature!');
//         }
//         return json({ data: requestBody }, 200);
//       } catch (error) {
//         return new Response('Error in The Use webhook', {
//           status: 500,
//         });
//       }
//     }
//   }

//   if (request.method.toLowerCase() === 'patch') {
//     const formData = await request.formData();

//     const id = formData.get('id') as string;
//     const price = formData.get('price');
//     const stock = formData.get('stock');

//     await updateInvoiceStatus({ id, price, stock });
//   }
//   return redirect('/order');
// }

// function isMootaIP(requestIP: string) {
//   const allowedIPs = process.env.ALLOWED_IPS?.split(',') ?? [];
//   return allowedIPs.includes(requestIP);
// }

// function verifySignature(secretKey: string, data: string, signature: string) {
//   const hmac = crypto.createHmac('sha256', secretKey);
//   const computedSignature = hmac.update(data).digest('hex');
//   console.log('computedSignature', computedSignature);
//   return computedSignature === signature;
// }

// export default function OrderNew() {
//   const { status } = useParams();
//   console.log('status', status);

//   // const data = useLoaderData<typeof loader>();

//   return (
//     <ImplementGrid>
//       <Flex align={'center'} justify={'center'} h={'100vh'}>
//         <NavOrderNew />
//       </Flex>
//     </ImplementGrid>
//   );
// }
