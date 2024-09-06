import { CalendarOutlined } from '@ant-design/icons'
import { Badge, Card, List } from 'antd'
import {Text} from '../text'
import React, { useState ,useEffect} from 'react'
import UpcomingEventsSkeleton from '../skeleton/upcoming-events'
import { useList } from '@refinedev/core'
import { DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY } from '@/graphql/queries'
import { getDate } from '@/utilities/helpers'
import dayjs from 'dayjs'


//----->HARDCODED:  Replace this with your hardcoded data
// WE NEED TO replace this data with SQL data base, non SQL database, prisma, mongo, etc...
const fakeData: Event[] = [
    { id: 1, title: 'Event 1', color: 'blue', startDate: '2024-09-01T00:00:00Z', endDate: '2024-09-01T01:00:00Z' },
    { id: 2, title: 'Event 2', color: 'green', startDate: '2024-09-02T00:00:00Z', endDate: '2024-09-02T01:00:00Z' },
    { id: 3, title: 'Event 3', color: 'red', startDate: '2024-09-03T00:00:00Z', endDate: '2024-09-03T01:00:00Z' },
    { id: 4, title: 'Event 4', color: 'purple', startDate: '2024-09-04T00:00:00Z', endDate: '2024-09-04T01:00:00Z' },
    { id: 5, title: 'Event 5', color: 'orange', startDate: '2024-09-05T00:00:00Z', endDate: '2024-09-05T01:00:00Z' },
  ];
  interface Event {
    id: number;
    title: string;
    color: string;
    startDate: string;
    endDate: string;
  }
  interface DataResponse {
    data: Event[];
  }

  const UpcomingEvents = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<DataResponse | null>(null); // Use the DataResponse type
  
    useEffect(() => {
      // Simulate data loading
      setIsLoading(true);
      setTimeout(() => {
        setData({ data: fakeData }); // Set data with the correct shape
        setIsLoading(false);
      }, 1000); // Simulate network delay
    }, []);
    //----->HARDCODED:
// ----> this part should be getting the data from the graphql server. since its not - i used the hard coded data above. 
// const UpcomingEvents = () => {
//   const {data, isLoading} = useList({
//     resource:'events',// resource for the list 
//     pagination:{pageSize:5},
//     sorters:[
//         {
//             field:'startDate',
//             order:'asc'
//         }
//     ],
//     filters:[
//         {
//             field:'startDate',
//             operator:'gte',
//             value:dayjs().format('YYYY-MM-DD')
//         }
//     ],
//     meta:{// how you are feching it from the database using graphql 
//         gqlQuery:DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY // TAKE upcoming event list data is taken 
//     }
//   });

  
// ----> this part should be getting the data from the graphql server. since its not - i used the hard coded data above. 



  
//   alert(data)
  return (
    <Card
    style={{ height: '100%' }}
    styles={{
        header: { padding: '8px 16px' },
        body: { padding: '0 1rem' }
    }}
    title={
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        }}>
            
            <CalendarOutlined />
            <Text size="sm" style ={{marginLeft: "0.7rem"}}>
                Upcoming Events
            </Text>
        </div>
        }
    >
        {isLoading?(
            // what would apear if there is not yet a data. ( Upcoming event skeleton - a throbing grey squares)
            //this apears when 
            <List
            itemLayout="horizontal"
            dataSource={Array.from({length:5}).map((_,index)=>({// example for an upcoming event array
                id:index,
            }))}
            renderItem={()=> <UpcomingEventsSkeleton/>}
            />
                
        ):(
            <List
            itemLayout='horizontal'
            dataSource={data?.data || []}// HERE YOU INSERT THINGS FROM config/resources/resource 
            renderItem={(item) => {
                const renderDate = getDate(item.startDate,item.endDate)
                return(
                    <List.Item >
                        <List.Item.Meta
                        avatar={<Badge color={item.color} />}
                        title={<Text size="xs">{renderDate} </Text>}
                        description = {<Text ellipsis={{tooltip:true}}
                        strong>
                            {item.title}
                        </Text>}
                        />
                    </List.Item>
                )
            }}
     
            >

            </List>
        )}
               {!isLoading && (data?.data.length ===0 || data===undefined) && (
                <span
                style={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    height:'220px'
                }}
                >No upcoming events</span>
            )}

    </Card>
  )
}

export default UpcomingEvents