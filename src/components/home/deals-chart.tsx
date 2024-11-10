import { DASHBOARD_DEALS_CHART_QUERY } from '@/graphql/queries'
import { mapDealsData } from '@/utilities/helpers';
import { AlertOutlined, DollarOutlined } from '@ant-design/icons'
import { Area, AreaConfig } from '@ant-design/plots'
import { useList, HttpError, useNavigation } from "@refinedev/core";
import Card from 'antd/es/card/Card'
import React, { useMemo } from 'react'
import { Text } from '../text'
import { useState, useEffect } from 'react';
import { DashboardDealsChartQuery } from '@/graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import dayjs from 'dayjs';

//------------------------------->use the server to go to mongodb<------------------------------------------//
type ChartItem = {
  contractor: string;
  title: string;
  month: string;
  year: number;
  value: number;
};

type ChartData = {
  items: ChartItem[];
};
//------------------------------->use the server to go to mongodb<------------------------------------------//

const DealsChart = () => {
  //------------------------------->use the server to go to mongodb<------------------------------------------//
  // const [chartData, setChartData] = useState<ChartData | null>(null);// Initialize as an empty array
  // const [config, setConfig] = useState<AreaConfig | null>(null); // Initialize config as null

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch('http://localhost:3000');
  //       const data: ChartData = await res.json();
  //       console.log('Fetched Data:', data);
  //       setChartData(data); // Set the fetched data to state
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (chartData && chartData.items.length) {
  //     chartData.items.map((p)=>p.value=Number(p.value));
  //     setConfig({
  //       data: chartData.items,
  //       xField: 'month',
  //       yField: 'value',
  //       seriesField: 'contractor',
  //       animation: true,
  //       smooth: true,
  //       startOnZero: false,
  //       legend: {
  //         offset: -6,
  //       },
  //       yAxis: {
  //         tickCount: 4,
  //         label: {
  //           formatter: (v: string) => ``,//formatter: (v: string) => `$${Number(v) / 100}k`,

  //         },
  //       },
  //       tooltip: {
  //         formatter: (data) => ({
  //           name: data.title,
  //           // value: `$${Number(data.value) / 100}k`,
  //           value: `${Number(data.value)}`,

  //         }),
  //       },
  //       height: 325,
  //       areaStyle: () => ({
  //         fillOpacity: 0.5,
  //       }),
  //     });
  //   }
  // }, [chartData]);

  // if (!config) {
  //   return <div>Loading...</div>; // Show a loading message until config is set
  // }

 //------------------------------->use the server to go to mongodb<------------------------------------------//

  
  //---->code thats not working from graphql

  //--->HARDCODE!!!!!!!
  
  const chartData = [
    { id: 'stage-1', title: 'Initial Contact', month: 'January', year: 2024, value: 1000 },
    { id: 'stage-1', title: 'Initial Contact', month: 'February', year: 2024, value: 2000 },
    { id: 'stage-1', title: 'Initial Contact', month: 'March', year: 2024, value: 2000 },
    { id: 'stage-1', title: 'Initial Contact', month: 'April', year: 2024, value: 2500 },
    { id: 'stage-1', title: 'Initial Contact', month: 'May', year: 2024, value: 3000 },
    { id: 'stage-1', title: 'Initial Contact', month: 'June', year: 2024, value: 5200 },
    { id: 'stage-1', title: 'Initial Contact', month: 'July', year: 2024, value: 53000 },
    { id: 'stage-1', title: 'Initial Contact', month: 'August', year: 2024, value: 1000 },
    { id: 'stage-1', title: 'Initial Contact', month: 'September', year: 2024, value: 1500 },
    { id: 'stage-1', title: 'Initial Contact', month: 'October', year: 2024, value: 1800 },
    { id: 'stage-1', title: 'Initial Contact', month: 'November', year: 2024, value: 2000 },
    { id: 'stage-1', title: 'Initial Contact', month: 'December', year: 2024, value: 2500 },

    { id: 'stage-2', title: 'Proposal Sent', month: 'January', year: 2024, value: 1000 },
    { id: 'stage-2', title: 'Proposal Sent', month: 'February', year: 2024, value: 1500 },
    { id: 'stage-2', title: 'Proposal Sent', month: 'March', year: 2024, value: 2000 },
    { id: 'stage-2', title: 'Proposal Sent', month: 'April', year: 2024, value: 3000 },
    { id: 'stage-2', title: 'Proposal Sent', month: 'May', year: 2024, value: 500 },
    { id: 'stage-2', title: 'Proposal Sent', month: 'June', year: 2024, value: 1000 },
    { id: 'stage-2', title: 'Proposal Sent', month: 'July', year: 2024, value: 2000 },
    { id: 'stage-2', title: 'Proposal Sent', month: 'August', year: 2024, value: 3000 },
    { id: 'stage-2', title: 'Proposal Sent', month: 'September', year: 2024, value: 3800 },
    { id: 'stage-2', title: 'Proposal Sent', month: 'October', year: 2024, value: 3500 },
    { id: 'stage-2', title: 'Proposal Sent', month: 'November', year: 2024, value: 1000 },
    { id: 'stage-2', title: 'Proposal Sent', month: 'December', year: 2024, value: 1500 },

    { id: 'stage-3', title: 'Negotiation', month: 'January', year: 2024, value: 20000 },
    { id: 'stage-3', title: 'Negotiation', month: 'February', year: 2024, value: 10000 },
    { id: 'stage-3', title: 'Negotiation', month: 'March', year: 2024, value: 5000 },
    { id: 'stage-3', title: 'Negotiation', month: 'April', year: 2024, value: 2000 },
    { id: 'stage-3', title: 'Negotiation', month: 'May', year: 2024, value: 3000 },
    { id: 'stage-3', title: 'Negotiation', month: 'June', year: 2024, value: 5000 },
    { id: 'stage-3', title: 'Negotiation', month: 'July', year: 2024, value: 4000 },
    { id: 'stage-3', title: 'Negotiation', month: 'August', year: 2024, value: 27000 },
    { id: 'stage-3', title: 'Negotiation', month: 'September', year: 2024, value: 28000 },
    { id: 'stage-3', title: 'Negotiation', month: 'October', year: 2024, value: 29000 },
    { id: 'stage-3', title: 'Negotiation', month: 'November', year: 2024, value: 30000 },
    { id: 'stage-3', title: 'Negotiation', month: 'December', year: 2024, value: 31000 },
  ];
//--->HARDCODE


const config: AreaConfig = {


  data: chartData,
  xField: 'month',
  yField: 'value',
  // isStack:false,
  seriesField: 'title',
  animation:true,
  smooth:true,
  startOnZero:false,
  legend:{
    offset:-6
  },
  yAxis:{
    tickCount:4,
    label:{
      formatter:(v:string)=>{
        return `$${Number(v)/100}k`
      }
    }
  },
  tooltip:{
    formatter:(data)=>{
      return{
        name:data.state,
        value:`$${Number(data.value)/100}k`
      }
    },
    
  },
  height: 325,
  areaStyle: () => ({
    fillOpacity: 0.5,
  }),
  
};

//--------->graphql
// const { list } = useNavigation();
//   const { data, isError, error } = useList<
//     GetFieldsFromList<DashboardDealsChartQuery>
//   >({
//     resource: "dealStages",
//     filters: [{ field: "title", operator: "in", value: ["WON", "LOST"] }],
//     meta: {
//       gqlQuery: DASHBOARD_DEALS_CHART_QUERY,
//     },
//   });

//   if (isError) {
//     console.error("Error fetching deals chart data", error);
//     return null;
//   }

//   const dealData = useMemo(() => {
//     const won = data?.data
//       .find((node) => node.title === "WON")
//       ?.dealsAggregate.map((item) => {
//         const { closeDateMonth, closeDateYear } = item.groupBy!;
//         const date = dayjs(`${closeDateYear}-${closeDateMonth}-01`);
//         return {
//           timeUnix: date.unix(),
//           timeText: date.format("MMM YYYY"),
//           value: item.sum?.value,
//           state: "טופל",//was--> state: "Won"
//         };
//       });

//     const lost = data?.data
//       .find((node) => node.title === "LOST")
//       ?.dealsAggregate.map((item) => {
//         const { closeDateMonth, closeDateYear } = item.groupBy!;
//         const date = dayjs(`${closeDateYear}-${closeDateMonth}-01`);
//         return {
//           timeUnix: date.unix(),
//           timeText: date.format("MMM YYYY"),
//           value: item.sum?.value,
//           state: "תקלה",//was -->state: "Lost"
//         };
//       });

//     return [...(won || []), ...(lost || [])].sort(
//       (a, b) => a.timeUnix - b.timeUnix,
//     );
//   }, [data]);

//   const config: AreaConfig = {
//     isStack: false,
//     data: dealData,
//     xField: "timeText",
//     yField: "value",
//     seriesField: "state",
//     animation: true,
//     startOnZero: false,
//     smooth: true,
//     legend: {
//       offsetY: -6,
//     },
//     yAxis: {
//       tickCount: 4,
//       label: {
//         formatter: (v) => {
//           return `${Number(v) / 10000}`;//was--> return `$${Number(v) / 1000}k`;
//         },
//       },
//     },
//     tooltip: {
//       formatter: (data) => {
//         return {
//           name: data.state,
//           value: `${Number(data.value) / 10000}`,// was-->value: `$${Number(data.value) / 1000}k`,

//         };
//       },
//     },
//     areaStyle: (datum) => {
//       const won = "l(270) 0:#ffffff 0.5:#b7eb8f 1:#52c41a";
//       const lost = "l(270) 0:#ffffff 0.5:#f3b7c2 1:#ff4d4f";
//       return { fill: datum.state === "טופל" ? won : lost };//was-->return { fill: datum.state === "Won" ? won : lost };
//     },
//     color: (datum) => {
//       return datum.state === "טופל" ? "#52C41A" : "#F5222D";//was->return datum.state === "Won" ? "#52C41A" : "#F5222D";
//     },
//   };

  return (
        <Card
        style={{height:'100%'}}
        styles={{
          header: { padding: '8px 16px' },
          body: { padding: '24px 24px 0 24px' }
        }}    
    title={
      <div
      style={{
        display:'flex',
        alignItems:'center',
        gap:'8px'
      }}
      
      >
        <AlertOutlined/>
        <Text size="sm" style = {{marginLeft:'0.5rem'}}>
          תקלות לפי תחום
        </Text>
      </div>
    }
    >
      <Area {...config} height={325}/>
    </Card>
    )
}

export default DealsChart