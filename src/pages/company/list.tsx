import CustomAvatar from '@/components/custom-avatar';
import { Text } from '@/components/text';
import { COMPANIES_LIST_QUERY } from '@/graphql/queries';
import { Company } from '@/graphql/schema.types';
import { currencyNumber } from '@/utilities';
import { SearchOutlined } from '@ant-design/icons';
import { CreateButton,DeleteButton,EditButton,FilterDropdown,List, useTable } from '@refinedev/antd'
import { getDefaultFilter, useGo,} from "@refinedev/core";
import { Input, Space, Table } from 'antd';

import React from 'react'

export const CompanyList = ({children}:React.PropsWithChildren) => {
  const go = useGo();//allows us to navigate to the different paths
  const {tableProps,filters} = useTable({
    resource:'companies',
    //applies filters (by name) to the entire table using the search button
    onSearch:(values)=>{
      return[
        {
          field:'name',
          operator:'contains',
          value:undefined
        }
      ]
    },
    pagination:{
      pageSize:12,
    },
    sorters:{
      initial:[
        {
          field:'createdAt',
          order:'desc'
        }
      ]
    },
    filters:{
      
        initial:[
          {
            field:'name',
            operator:'contains',
            value:undefined
          }
        ]
    },
    meta:{
      gqlQuery:COMPANIES_LIST_QUERY
    }
  })
  return (
    <div>
    <List
    canCreate={true}
    breadcrumb={false}
    headerButtons={()=>(
      <CreateButton
      onClick={() => {
        go({
          to:{
            resource:'companies',
            action:'create',
          },
          options:{
            keepQuery:true
          },
          type:'replace'
        })
      }}
      />
    )}
  >
    <Table
    {...tableProps}
    pagination={{
      ...tableProps.pagination
    }}
    >
      <Table.Column
      dataIndex="name"
      title="שם הקבלן"
      defaultFilteredValue={getDefaultFilter('id',filters)}
      filterIcon={<SearchOutlined/>}
      filterDropdown={(props)=>(
        <FilterDropdown {...props}>
          <Input placeholder="Search Company"/>
        </FilterDropdown>
        
      )}  
      render={(value,record)=>(
        <Space>
          <CustomAvatar
          shape="square"
          name={record.name}
          src={record.avatarUrl}/>
          <Text
          style={{whiteSpace:'nowrap'}}>
            {record.name}
          </Text>
        </Space>
      )}      
      />
    <Table.Column
    dataIndex="totalRevenue"
    title="היקף עבודה [ש״ח]"
    render={(value,company) =>(
      <Text>
        {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
      </Text>
    )}/>
        <Table.Column
    dataIndex="id"
    title="פעולות"
    fixed="right"
    render={(value) =>(
      <Space>
        <EditButton hideText size="small" recordItemId={value}/>
        <DeleteButton hideText size="small" recordItemId={value}/>
      </Space>
    )}/>
    </Table>
      
    </List>
    {children}
    </div>
  )
}

