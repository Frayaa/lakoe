import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps,
  useToast,
  Image,
} from "@chakra-ui/react";
import { format } from "date-fns-tz";
import { useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import useOrderTracking from "~/hooks/useOrderTracking";
import copy from "~/assets/DetailOrderIcon/copy.svg";
import { useLoaderData } from "@remix-run/react";
import { loader } from "~/routes/order";

export interface SendProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCardId: string;
}

export default function ModalTracking(props: SendProps) {
  const { orderTrackingsData, orderMultiTrackingsData } = useOrderTracking(
    props.selectedCardId
  );

  let steps = orderMultiTrackingsData;

  const stepCount = steps.length;
  const stepHeight = 65;

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const toast = useToast();
  const [, setCopied] = useState(false);

  const handleCopyClick = () => {
    const textToCopy = orderTrackingsData?.waybill_id as string;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);

      toast({
        title: "Teks telah disalin ke clipboard!",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    });
  };
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent minWidth="fit-content" height="fit-content">
          <ModalHeader>Lacak Pengiriman</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Box
                width={"606px"}
                height={"176px"}
                padding={"10px"}
                gap={"10px"}
                display={"flex"}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  width={"288px"}
                  height={"156px"}
                  gap={3}
                >
                  <Box width={"288px"} height={"44px"} gap={1}>
                    <Text
                      fontSize={"14px"}
                      fontWeight={"400"}
                      lineHeight={"20px"}
                      color={"#1D1D1D"}
                    >
                      Kurir
                    </Text>
                    <Text
                      fontSize={"14px"}
                      fontWeight={"700"}
                      lineHeight={"20px"}
                      color={"#1D1D1D"}
                    >
                      {orderTrackingsData?.courier.company}
                    </Text>
                  </Box>
                  <Box width={"288px"} height={"44px"} gap={1}>
                    <Box display={"flex"} gap={1}>
                      <Text
                        fontSize={"14px"}
                        fontWeight={"400"}
                        lineHeight={"20px"}
                        color={"#1D1D1D"}
                      >
                        No. Resi
                      </Text>
                      <Image
                        height={"18px"}
                        width={"18px"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        src={copy}
                        onClick={handleCopyClick}
                        style={{ cursor: "pointer" }}
                        color={"gray.900"}
                      />
                    </Box>
                    <Text
                      fontSize={"14px"}
                      fontWeight={"700"}
                      lineHeight={"20px"}
                      color={"#1D1D1D"}
                    >
                      {orderTrackingsData?.waybill_id}
                    </Text>
                  </Box>
                  <Box width={"288px"} height={"44px"} gap={1}>
                    <Text
                      fontSize={"14px"}
                      fontWeight={"400"}
                      lineHeight={"20px"}
                      color={"#1D1D1D"}
                    >
                      Pengirim
                    </Text>
                    <Text
                      fontSize={"14px"}
                      fontWeight={"700"}
                      lineHeight={"20px"}
                      color={"#1D1D1D"}
                    >
                      {orderTrackingsData?.origin.contact_name}
                    </Text>
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  width={"288px"}
                  height={"86px"}
                  gap={4}
                >
                  <Box width={"288px"} height={"44px"} gap={"4px"}>
                    <Text
                      fontSize={"14px"}
                      fontWeight={"400"}
                      lineHeight={"20px"}
                      color={"#1D1D1D"}
                    >
                      Penerima
                    </Text>
                    <Text
                      fontSize={"14px"}
                      fontWeight={"700"}
                      lineHeight={"20px"}
                      color={"#1D1D1D"}
                    >
                      {orderTrackingsData?.destination.contact_name}
                    </Text>
                    <Text
                      fontSize={"14px"}
                      fontWeight={"400"}
                      lineHeight={"20px"}
                      color={"#1D1D1D"}
                    >
                      {orderTrackingsData?.destination.address}
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box
                width={"606px"}
                height={"20px"}
                padding={"10px"}
                gap={"2px"}
                display={"flex"}
              >
                <Box width={"55px"} height={"20px"}>
                  <Text
                    fontSize={"16px"}
                    fontWeight={"500"}
                    lineHeight={"20px"}
                    color={"#1D1D1D"}
                  >
                    Status:
                  </Text>
                </Box>
                <Box width={"250px"} height={"20px"}>
                  <Text
                    fontSize={"16px"}
                    fontWeight={"700"}
                    lineHeight={"20px"}
                    color={"#1D1D1D"}
                  >
                    {orderTrackingsData?.status ?? "N/A"}
                  </Text>
                </Box>
              </Box>
              <Box
                width={"606px"}
                // height={"300px"}
                padding={" 20px 16px 0px 16px"}
              >
                {/* Stepper */}
                <Stepper
                  size={"sm"}
                  index={activeStep}
                  orientation="vertical"
                  width={"100%"}
                  height={`${stepCount * stepHeight}px`}
                  gap="0"
                  border={"1px solid #E6E6E6"}
                  padding={"var(--4, 16px)"}
                  borderRadius={"var(--rounded-lg, 12px)"}
                >
                  {steps.reverse().map((step: any, index: number) => (
                    <Step key={index}>
                      <StepIndicator>
                        <StepStatus
                          complete={
                            <div
                              style={{
                                background:
                                  index === 0 ? "#C5F8FF" : "transparent",
                                borderRadius: "50%",
                                padding: "7px",
                                display: "inline-block",
                              }}
                            >
                              <BsCircleFill size={"12px"} color="#0086B4" />
                            </div>
                          }
                          incomplete={
                            <div
                              style={{
                                background: "#F8F8F8",
                                borderRadius: "50%",
                                padding: "7px",
                                display: "inline-block",
                              }}
                            >
                              <BsCircleFill size={"12px"} color="#D5D5D5" />
                            </div>
                          }
                          active={
                            <div
                              style={{
                                background: "#F8F8F8",
                                borderRadius: "50%",
                                padding: "7px",
                                display: "inline-block",
                              }}
                            >
                              <BsCircleFill size={"12px"} color="#D5D5D5" />
                            </div>
                          }
                        />
                      </StepIndicator>

                      <Box flexShrink="0">
                        <StepTitle>{step.note}</StepTitle>
                        <StepDescription>
                          {format(
                            new Date(step?.updated_at),
                            "EEE, dd MMM yyyy - HH:mm zzzz", // Desired output format
                            { timeZone: "Asia/Jakarta" } // Time zone (WIB)
                          )}
                        </StepDescription>
                      </Box>

                      <StepSeparator />
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
