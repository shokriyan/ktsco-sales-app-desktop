import { Box, Center, Spinner } from "@chakra-ui/react";

const LoadSpinner = () => {
  return (
    <Box
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 2,
        alignContent: "center",
        background: "gray-100",
      }}
    >
      <Center>
        <Spinner
          style={{
            position: "absolute",
            top: "40%",
            bottom: "40%",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue"
          size="xl"
        />
      </Center>
    </Box>
  );
};

export default LoadSpinner;
