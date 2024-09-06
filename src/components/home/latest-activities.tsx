import { DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY, DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY } from '@/graphql/queries'
import { UnorderedListOutlined } from '@ant-design/icons'
import { useList } from '@refinedev/core'
import { Card, Divider, List, Space } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { isErrored } from 'stream'
import CustomAvatar from '../custom-avatar'
import LatestActivitiesSkeleton from '../skeleton/latest-activities'
import { Text } from '../text'


// Mock data for top 10 companies with logo URLs
const companies = [
    { id: '1', name: 'Apple', avatarUrl: 'https://logo.clearbit.com/apple.com' },
    { id: '2', name: 'Microsoft', avatarUrl: 'https://logo.clearbit.com/microsoft.com' },
    { id: '3', name: 'Google', avatarUrl: 'https://logo.clearbit.com/google.com' },
    { id: '4', name: 'Amazon', avatarUrl: 'https://logo.clearbit.com/amazon.com' },
    { id: '5', name: 'Facebook', avatarUrl: 'https://logo.clearbit.com/facebook.com' },
    { id: '6', name: 'Tesla', avatarUrl: 'https://logo.clearbit.com/tesla.com' },
    { id: '7', name: 'Samsung', avatarUrl: 'https://logo.clearbit.com/samsung.com' },
    { id: '8', name: 'IBM', avatarUrl: 'https://logo.clearbit.com/ibm.com' },
    { id: '9', name: 'Intel', avatarUrl: 'https://logo.clearbit.com/intel.com' },
    { id: '10', name: 'Cisco', avatarUrl: 'https://logo.clearbit.com/cisco.com' },
];

// Mock data for audits (10 random activities)
const audits = Array.from({ length: 10 }).map((_, i) => ({
    id: `${i + 1}`,
    action: ['CREATE', 'UPDATE', 'DELETE'][Math.floor(Math.random() * 3)],
    targetEntity: 'deal',
    targetId: `${companies[i % companies.length].id}`,
    changes: [
        {
            field: 'status',
            from: 'pending',
            to: 'approved',
        },
    ],
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
    user: {
        id: `${i + 1}`,
        name: `User ${i + 1}`,
        avatarUrl: `https://randomuser.me/api/portraits/lego/${i + 1}.jpg`,
    },
}));

// Mock data for deals (matching the audits)
const deals = audits.map((audit) => ({
    id: audit.targetId,
    company: companies.find((company) => company.id === audit.targetId),
    createdAt: audit.createdAt,
    title: `Feature Deal ${audit.targetId}`, // Mock title for the deal
    stage: { title: ['NEW', 'IN PROGRESS', 'COMPLETED'][Math.floor(Math.random() * 3)] }, // Mock stage
}));

// Combined mock data
const data = {
    audit: { data: audits },
    deals: { data: deals },
    isLoadingAudit: false,
    isLoadingDeals: false,
    error: false,
};


const LatestActivities = () => {
        //mockdata:
   // Using the mock data instead of GraphQL query
   const { audit, deals, isLoadingAudit, isLoadingDeals, error } = data;

   
    ///---->not working graphql
    //get the audit from the first list
    // const {data:audit ,isLoading:isLoadingAudit,isError:error} =useList({
    //    resource:'audits',
    //    meta:{
    //     gqlQuery:DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY
    //    } 
    // });
    // //map all the deal ids to make another col: 
    // const dealIds = audit?.data?.map((audit) => audit?.targetId);

    // //get the deals with the id of the dealsId ( the deals is the actual data that we want to showcase):
    // const {data:deals,isLoading:isLoadingDeals}=useList({
    //     resource:'deals',
    //     queryOptions:{enabled:!!dealIds?.length},
    //     pagination:{
    //         mode:'off'
    //     },
    //     filters:[{field:'id',operator:'in',value:dealIds}],
    //     meta:{
    //         gqlQuery:DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY
    //     }
    // })

    // // const isLoading = true;
    // const isLoading = isLoadingAudit||isLoadingDeals;

    //not working graphql--->



   const isLoading = isLoadingAudit || isLoadingDeals;
  return (
        <Card
            styles={{
                header:{padding:'16px'},
                body:{padding:'0rem'},
            }}
            title={(
                <div
                style={{display:'flex', alignItems:'center',gap:'8px'}}>
                <UnorderedListOutlined/>
                <Text size="sm" style={{marginLeft:'0.5rem'}}>
                    Latest Activities
                </Text>
                </div>
            )}
        >
            {isLoading? (
                <List
                 itemLayout='horizontal' 
                 dataSource={Array.from({length:5})
                 .map((_,i) => ({id:i}))}
                 renderItem={(_,index)=>(
                 <LatestActivitiesSkeleton key={index}/>
                 )}
                 />
                 ):(<List
                    itemLayout='horizontal'
                    dataSource={audit?.data}
                    renderItem={(item)=> {
                        const deal = deals?.data.find((deal) =>deal.id ==item.targetId ) || undefined;

                        return(

                            <List.Item>
                                <List.Item.Meta
                                title={dayjs(deal?.createdAt).format('MMM DD YYYY - HH:mm')}
                                avatar={
                                    <CustomAvatar
                                    shape='square'
                                    size={48}
                                    src={deal?.company?.avatarUrl}
                                    name={deal?.company?.name}
                                    />
                                }
                                description={
                                    <Space size={4}>
                                        <Text strong>{item.user?.name}</Text>
                                        <Text>
                                            {item.action === 'CREATE' ? 'created' : item.action === 'UPDATE' ? 'moved' : 'deleted'}
                                        </Text>
                                        <Text strong>{deal?.title}</Text>
                                        <Text>deal</Text>
                                        <Text>{item.action === 'CREATE' ? 'in' : item.action === 'UPDATE' ? 'to' : ''}</Text>
                                        <Text strong>
                                            {deal?.stage?.title}
                                        </Text>
                                    </Space>
                                }
                                
                                />
                            </List.Item>
                        )
                    }}

                    />)}

        </Card>
    )
}

export default LatestActivities