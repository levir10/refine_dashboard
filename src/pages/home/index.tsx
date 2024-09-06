//page #4
import { DashboardTotalCountCard, DealsChart, LatestActivities, UpcomingEvents } from "@/components"
import { DASHBOARD_TOTAL_COUNTS_QUERY } from "@/graphql/queries"
import { DashboardTotalCountsQuery } from "@/graphql/types"
import { useCustom } from "@refinedev/core"
import {Col,Row} from "antd"
export const Home = () => {

  //---> graphql server is not working.. 
  // const {data,isLoading}=useCustom<DashboardTotalCountsQuery>({
  //   url:'',
  //   method:'get',
  //   meta:{
  //     gqlQuery:DASHBOARD_TOTAL_COUNTS_QUERY
  //   }
  // })
  ///----> Rep[lace the data variable with randome values data:
      // Mock data simulating the GraphQL response
      const data = {
        data: {
            companies: {
                totalCount: Math.floor(Math.random() * 1000), // Random number for companies
            },
            contacts: {
                totalCount: Math.floor(Math.random() * 500),  // Random number for contacts
            },
            deals: {
                totalCount: Math.floor(Math.random() * 300),  // Random number for deals
            },
        },
    };
 // Mock loading state (set to false since it's not loading in this mock scenario)
 const isLoading = false;
  return (
    <div>
      {/* 3 dashboard charts up top */}
      <Row
      gutter={[32,32]}>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
          resource ="companies"
          isLoading={isLoading}
          totalCount={data?.data.companies.totalCount}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
          resource ="contacts"
          isLoading={isLoading}
          totalCount={data?.data.contacts.totalCount}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
          resource ="deals"
          isLoading={isLoading}
          totalCount={data?.data.deals.totalCount}
          />
        </Col>

      </Row>

      {/* row for the big chart and upcoming event */}
      <Row
      gutter={[32,32]}
      style={{
        marginTop:'32px'
      }}
      >
        <Col 
        xs={24}
        sm={24}
        xl={8}
        style = {{
          height:'460px'
        }}
        >
          <UpcomingEvents/> 
        </Col>

        <Col 
        xs={24}
        sm={24}
        xl={16}
        style = {{
          height:'460px'
        }}
        >
          <DealsChart />
        </Col>
      </Row>
      <Row
      gutter={[32,32]}
      style={{
        marginTop:'32px'
      }}
      >
        <Col xs={24}>
          <LatestActivities/>
        </Col>
      </Row>
    </div>
  )
}


