import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
} from '@chakra-ui/react';
import type { ActionArgs } from '@remix-run/node';
import { Form, useParams } from '@remix-run/react';
import { useState } from 'react';
import { PiShoppingCartThin } from 'react-icons/pi';
import { db } from '~/libs/prisma/db.server';

export async function loader({ params }: ActionArgs) {
  const data = params;
  return await db.invoice.findUnique({
    where: {
      id: data.invoiceId as string,
    },
  });
}

export const action = async ({ request }: ActionArgs) => {
  if (request.method.toLowerCase() === 'post') {
    const formData = await request.formData();

    const invoiceId = formData.get('invoiceId');
    const invoice = formData.get('invoice');
    const bank = formData.get('bank');
    const createdAt = formData.get('createdAt');
    const amount = formData.get('invoiceId');
    const attachment = formData.get('attachment');

    const data = {
      invoiceId,
      invoice,
      bank,
      createdAt,
      amount,
      attachment,
    };

    console.log('data:', data);
  }

  return null;
  // return redirect(/checkout/aefnrrst / confirm);
};

export default function TransferPayment() {
  const [file] = useState<File | null>(null);
  const { invoiceId } = useParams();
  console.log(invoiceId);
  return (
    <Flex direction="column" align="center">
      <Box fontSize={'100px'} mt={'10px'}>
        <PiShoppingCartThin />
      </Box>
      <Heading fontSize="2xl" textAlign="center">
        KONFIRMASI PEMBAYARAN
      </Heading>

      <Container
        width={'80%'}
        bg={'whiteAlpha.50'}
        p={10}
        mt={'3%'}
        mb={'2%'}
        boxShadow="0px 0px 3px 1px rgba(3, 3, 3, 0.3)"
        borderRadius={'3px'}
      >
        <Form method="post">
          <Stack spacing={4}>
            <FormControl id="invoiceId" isRequired>
              <FormLabel>Order ID</FormLabel>
              <Input name="invoiceId" type="text" placeholder="invoiceId" />
            </FormControl>
            <FormControl id="invoice" isRequired>
              <FormLabel>Atas Nama Rekening</FormLabel>
              <Input
                name="invoice"
                type="text"
                placeholder="Pemilik Rekening"
              />
            </FormControl>
            <FormControl id="bank" isRequired>
              <FormLabel>Transfer Ke</FormLabel>
              <Select name="bank">
                <option value="" hidden>
                  Pilihan Bank
                </option>
                <option value="Bank BRI">Bank BRI</option>
                <option value="Bank BCA">Bank BCA</option>
                <option value="Bank BNI">Bank BNI</option>
                <option value="Bank BNI">Bank MANDIRI</option>
              </Select>
            </FormControl>
            <FormControl id="transfer-date" isRequired>
              <FormLabel>Tanggal Transfer</FormLabel>
              <Input
                name="createdAt"
                type="date"
                placeholder="Pilih Tanggal Transfer"
              />
            </FormControl>
            <FormControl id="transfer-amount" isRequired>
              <FormLabel>Jumlah Transfer</FormLabel>
              <InputGroup>
                <Input
                  name="amount"
                  type="number"
                  placeholder="Jumlah Transfer"
                />
                <InputRightElement width="4.5rem">IDR</InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="upload-proof" isRequired mb={5}>
              <FormLabel>Bukti Transfer</FormLabel>
              <Box position={'relative'} mb={5} alignItems={'center'}>
                <Input
                  name="attachment"
                  position={'absolute'}
                  p={1}
                  placeholder="medium size"
                  size="md"
                  type="file"
                  accept=".jpg, .jpeg, .png, .pdf"
                />
              </Box>
            </FormControl>
            {file && (
              <Image
                src={URL.createObjectURL(file)}
                alt="Bukti Transfer"
                maxH="100px"
              />
            )}
            <Button mt={'10px'} type="submit" colorScheme="blue" width={'100%'}>
              Kirim
            </Button>
          </Stack>
        </Form>
      </Container>
    </Flex>
  );
}
