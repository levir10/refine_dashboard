import { totalCountVariants } from '@/constants'
import { Area, AreaConfig } from '@ant-design/plots'
import { Card, Skeleton } from 'antd'
import React from 'react'
import { Text } from '../text'
type Props={
resource:"companies" | "contacts" | "deals",
isLoading:boolean,
totalCount:number
}
const DashboardTotalCountCard = ({resource,isLoading,totalCount}:Props) => {
    const {primaryColor,secondaryColor,icon,title} = 
    totalCountVariants[resource];  // comes from a constant file here: /Users/orlevi/Desktop/OrLevisProjects/Kanban/calm-parts-throw/src/constants/index.tsx
    
    //the charts
    const config:AreaConfig={
        data:totalCountVariants[resource].data,
        xField:'index',
        yField:'value',
        appendPadding:[1,0,0,0],
        padding:0,
        syncViewPadding:true,
        tooltip:false,
        animation:false,
        xAxis:false,
        yAxis:{
            tickCount:12,
            label:{
                style:{
                    stroke:'transparent'
                }
            },
            grid:{
                line:{
                    style:{
                        stroke:'transparent'
                    }
                }

            }
        },
        smooth:true,
        line:{
            color:primaryColor,// chart line color
        },
        areaStyle:()=>{
            return {
                fill:`l(270) 0:#fff 0.2${secondaryColor} 1:${primaryColor} `// creating a gradient fill color to the charts
            }
        }

    }
    return (
    <Card
    style={{height:"96px" ,padding:0}}
    size="small"
    styles={{
        body:{padding:'8px 8px 8px 12px'}
    }}>
        <div
        
        style={{display:'flex',
        alignItems:'center',
        gap:'8px',
        whiteSpace:'nowrap'}}
        >
            {icon}
            <Text size="md" className='secondary' style={{marginLeft:'8px'}}>
                {title}
            </Text>
            
        </div>
        <div
        style={{display:'flex', justifyContent:'space-between'}}>
            <Text size="xxxl" strong style={{flex:1,whiteSpace:'nowrap',flexShrink:0, textAlign:'start',marginLeft:'48px',fontVariantNumeric:'tabular-nums'}}>
               {isLoading?( <Skeleton.Button style={{marginTop:'8px',width:'74px'}}/>):(totalCount)}
            </Text>
            <Area {...config} style = {{width:'50%'}}/>

        </div>
    


    </Card>
    )
}

export default DashboardTotalCountCard