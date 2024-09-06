import { FireFilled} from '@ant-design/icons'
import { ThemedTitleV2,ThemedLayoutV2 } from '@refinedev/antd'
import React from 'react'
import Header from './header'

//make sure the Header components is on all of the views with this
const Layout = ({children}: React.PropsWithChildren) => {
  return (
    // this conponent can accept a prop called header that we take from the Header components
    <ThemedLayoutV2
    Header={Header}
    Title = {(titleProps) => <ThemedTitleV2 {...titleProps} text= "מעקב משימות" icon={<FireFilled/>}/>
    }
    >
        {children}
    </ThemedLayoutV2>
    )
}

export default Layout