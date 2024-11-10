// import CustomAvatar from '@/components/custom-avatar'
// import { Text } from '@/components/text'
// import { TextIcon } from '@/components/text-icon'
// import { User } from '@/graphql/schema.types'
// import { getDateColor } from '@/utilities'
// import { ClockCircleOutlined, DeleteOutlined, EyeOutlined, MoreOutlined } from '@ant-design/icons'
// import { useDelete, useNavigation } from '@refinedev/core'
// import { Button, Card, ConfigProvider, Dropdown, MenuProps, Space, Tag, theme, Tooltip } from 'antd'
// import dayjs from 'dayjs'
// import  { memo, useMemo } from 'react'
// import axios from 'axios';

// type ProjectCardProps = {
//     id:string,
//     title:string,
//     updatedAt:string,
//     dueDate?:string,
//     users?:{
//         id:string,
//         name:string,
//         avatarUrl?:User['avatarUrl']
        
//     }[]
// }

// const ProjectCard = ({ id, title, dueDate, users }: ProjectCardProps) => {
//     const { token } = theme.useToken();
//     const { edit } = useNavigation();

//     // Remove the useDelete hook since we are not using it
//     const dropdownItems = useMemo(() => {
//         const dropdownItems: MenuProps['items'] = [
//             {
//                 label: 'View Task',
//                 key: '1',
//                 icon: <EyeOutlined />,
//                 onClick: () => {
//                     edit('tasks', id, 'replace');
//                 }
//             },
//             {
//                 danger: true,
//                 label: 'Delete Task',
//                 key: 2,
//                 icon: <DeleteOutlined />,
//                 onClick: async () => {
//                     try {
//                         // Send a DELETE request to your MongoDB API
//                         await axios.delete(`https://refine-dashboard-5.onrender.com/tasks/${id}`);
//                         console.log('Task deleted successfully');
//                         // Optionally refresh the tasks list or show a notification
//                     } catch (error) {
//                         console.error('Error deleting task:', error);
//                     }
//                 }
//             }
//         ];
//         return dropdownItems;
//     }, [id, edit]);

//     const dueDateOptions = useMemo(() => {
//         if (!dueDate) return null;
//         const date = dayjs(dueDate);
//         return {
//             color: getDateColor({ date: dueDate }) as string,
//             text: date.format('MM DD')
//         };
//     }, [dueDate]);

//     return (
//         <ConfigProvider
//             theme={{
//                 components: {
//                     Tag: {
//                         colorText: token.colorTextSecondary,
//                     },
//                     Card: {
//                         headerBg: 'transparent',
//                     }
//                 }
//             }}
//         >
//             <Card
//                 size="small"
//                 title={<Text ellipsis={{ tooltip: title }}>{title}</Text>}
//                 onClick={() => edit('tasks', id, 'replace')}
//                 extra={
//                     <Dropdown
//                         trigger={["click"]}
//                         menu={{
//                             items: dropdownItems,
//                             onPointerDown: (e) => {
//                                 e.stopPropagation();
//                             },
//                             onClick: (e) => {
//                                 e.domEvent.stopPropagation();
//                             }
//                         }}
//                         placement='bottom'
//                         arrow={{ pointAtCenter: true }}
//                     >
//                         <Button
//                             type="text"
//                             shape="circle"
//                             icon={<MoreOutlined style={{ transform: 'rotate(90deg)' }} />}
//                             onPointerDown={(e) => {
//                                 e.stopPropagation();
//                             }}
//                             onClick={(e) => {
//                                 e.stopPropagation();
//                             }}
//                         />
//                     </Dropdown>
//                 }
//             >
//             <div
//             style={{
//                 display:'flex',
//                 flexWrap:'wrap',
//                 alignItems:'center',
//                 gap:'8px'
//             }}>
//             <TextIcon
//             style={{marginRight:'4px'}}/>
//             {dueDateOptions &&(
//                 <Tag 
//                 icon={ <ClockCircleOutlined style={{fontSize:'12px'}}/> }
//                 style={{
//                     padding:'0 4px',
//                     marginInlineEnd:'0',
//                     backgroundColor:dueDateOptions.color ==='default'?
//                     'transparent':'unset',

//                 }}
//                 color={dueDateOptions.color}
//                 bordered={dueDateOptions.color!=='default'}
//                 >
//                 {dueDateOptions.text}
//                 </Tag>
//             )}
//             {!!users?.length &&(
//                 <Space
//                 size={4}
//                 wrap
//                 direction='horizontal'
//                 align='center'
//                 style={{
//                     display:'flex',
//                     justifyContent:'flex-end',
//                     marginLeft:'auto',
//                     marginRight:'right'
//                 }}
//                 >
//                     {users.map((user)=>(
//                         <Tooltip key={user.id} title={user.name}>
//                             <CustomAvatar name={user.name} src={user.avatarUrl}/>
//                         </Tooltip>
//                     ))}
//                 </Space>
//             )}
           
//             </div>

//         </Card>

//     </ConfigProvider>
//   )
// }

// export default ProjectCard
// // since all of the props are the same for all, 
// //we want to reuse them across the different stages
// //we want to render ONLY THE CARD that was transferred to the new stage,
// // but the components inside it stay the same and saved in the memo: 
// export const ProjectCardMemo = memo(ProjectCard,(prev,next)=>{
//     return(
//         prev.id===next.id &&
//         prev.title===next.title &&
//         prev.dueDate===next.dueDate &&
//         prev.users?.length===next.users?.length &&
//         prev.updatedAt===next.updatedAt
//     )
// })

import CustomAvatar from '@/components/custom-avatar'
import { Text } from '@/components/text'
import { TextIcon } from '@/components/text-icon'
import { User } from '@/graphql/schema.types'
import { getDateColor } from '@/utilities'
import { ClockCircleOutlined, DeleteOutlined, EyeOutlined, MoreOutlined } from '@ant-design/icons'
import { useDelete, useNavigation } from '@refinedev/core'
import { Button, Card, ConfigProvider, Dropdown, MenuProps, Space, Tag, theme, Tooltip } from 'antd'
import dayjs from 'dayjs'
import React, { memo, useMemo } from 'react'
import axios from 'axios';
import { useTasks } from 'TaskContext'; // Ensure correct import path

type ProjectCardProps = {
    id:string,
    title:string,
    updatedAt:string,
    dueDate?:string,
    users?:{
        id:string,
        name:string,
        avatarUrl?:User['avatarUrl']
        
    }[]
}
const ProjectCard = ({id,title,dueDate,users}:ProjectCardProps) => {
const { deleteTaskFromContext, refreshTasks,openEditModal } = useTasks();
const {token} = theme.useToken()
// for the elements on the card to be editable
const {edit} =useNavigation();
const {mutate} =useDelete();
const dropdownItems=useMemo(()=>{
    const dropdownItems:MenuProps['items']=[
        {
            label:'לצפיה בכרטיסיה',
            key:'1',
            icon:<EyeOutlined/>,
            onClick:()=>{
                openEditModal(id);
                edit('tasks',id,'replace');
                refreshTasks();
            }
        },
        {
            danger: true,
            label: 'מחק כרטיסיה',
            key: 2,
            icon: <DeleteOutlined />,
            onClick: () => {
              // Optimistically remove the task from the local context
              deleteTaskFromContext(id);
              
              // Perform the deletion on the backend
            //   axios.delete(`https://refine-dashboard-5.onrender.com/tasks/${id}`)
              axios.delete(`http://localhost:3000/tasks/${id}`)
                .then(() => {
                  // Optionally refresh tasks if needed
                  // refreshTasks();
                })
                .catch((error) => {
                  console.error('Error deleting task:', error);
                  // Optionally, you can roll back the optimistic deletion in case of error
                  refreshTasks(); // Refresh tasks in case of an error
                });
            }
          }
          
    ]
    return dropdownItems
},[])

const dueDateOptions=useMemo(()=>{
if(!dueDate) return null;//if we dont have a due date
//else - if we do have a due date:
const date=dayjs(dueDate);
return {
    color:getDateColor({date:dueDate}) as string,
    text:date.format('MM DD')
}
},[dueDate]);

// const edit=()=>{}
    return (
    <ConfigProvider
    theme={{
        components:{
            Tag:{
                colorText:token.colorTextSecondary,
            },
            Card:{
                headerBg:'transparent',
            }
        }
    }}
    >
        <Card
        size="small"
        title={<Text ellipsis={{tooltip:title}}>{title}</Text>}
        onClick={()=>{
            openEditModal(id);
            edit('tasks',id,'replace')}
            
        }
        extra={
            <Dropdown
            trigger={["click"]}
            menu={{
                items:dropdownItems,
                onPointerDown:(e) =>{
                    e.stopPropagation()
                },
                onClick:(e) => {
                    e.domEvent.stopPropagation()
                }
            }}
            placement='bottom'
            arrow={{pointAtCenter:true}}
            >
            <Button
            type="text"
            shape="circle"
            icon={
                <MoreOutlined
                style={{
                    transform:'rotate(90deg)'
                }}
                />
            }
            onPointerDown={(e)=>{
                e.stopPropagation()
            }}
            onClick={(e)=>{
                e.stopPropagation()
            }}
            />
            </Dropdown>
        }
        >
            <div
            style={{
                display:'flex',
                flexWrap:'wrap',
                alignItems:'center',
                gap:'8px'
            }}>
            <TextIcon
            style={{marginRight:'4px'}}/>
            {dueDateOptions &&(
                <Tag 
                icon={ <ClockCircleOutlined style={{fontSize:'12px'}}/> }
                style={{
                    padding:'0 4px',
                    marginInlineEnd:'0',
                    backgroundColor:dueDateOptions.color ==='default'?
                    'transparent':'unset',

                }}
                color={dueDateOptions.color}
                bordered={dueDateOptions.color!=='default'}
                >
                {dueDateOptions.text}
                </Tag>
            )}
            {!!users?.length &&(
                <Space
                size={4}
                wrap
                direction='horizontal'
                align='center'
                style={{
                    display:'flex',
                    justifyContent:'flex-end',
                    marginLeft:'auto',
                    marginRight:'right'
                }}
                >
                    {users.map((user)=>(
                        <Tooltip key={user.id} title={user.name}>
                            <CustomAvatar name={user.name} src={user.avatarUrl}/>
                        </Tooltip>
                    ))}
                </Space>
            )}
           
            </div>

        </Card>

    </ConfigProvider>
  )
}

export default ProjectCard
// since all of the props are the same for all, 
//we want to reuse them across the different stages
//we want to render ONLY THE CARD that was transferred to the new stage,
// but the components inside it stay the same and saved in the memo: 
export const ProjectCardMemo = memo(ProjectCard,(prev,next)=>{
    return(
        prev.id===next.id &&
        prev.title===next.title &&
        prev.dueDate===next.dueDate &&
        prev.users?.length===next.users?.length &&
        prev.updatedAt===next.updatedAt
    )
})


