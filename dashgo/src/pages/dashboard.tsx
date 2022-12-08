import dynamic from "next/dynamic"
import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  theme,
} from "@chakra-ui/react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
})

import type { ApexOptions } from "apexcharts"

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2022-11-28T00:00:00.000Z",
      "2022-11-29T00:00:00.000Z",
      "2022-11-30T00:00:00.000Z",
      "2022-12-01T00:00:00.000Z",
      "2022-12-02T00:00:00.000Z",
      "2022-12-03T00:00:00.000Z",
      "2022-12-04T00:00:00.000Z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.6,
      opacityTo: 0.2,
    },
  },
}
const series = [
  {
    name: "series-1",
    data: [31, 120, 10, 28, 61, 18, 109],
  },
]

function dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box p="8" bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Weekly subscribers
            </Text>
            {typeof window !== "undefined" && (
              <Chart
                type="area"
                height={160}
                options={options}
                series={series}
              />
            )}
          </Box>
          <Box p="8" bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Opening fee
            </Text>
            {typeof window !== "undefined" && (
              <Chart
                type="area"
                height={160}
                options={options}
                series={series}
              />
            )}
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}

export default dashboard
