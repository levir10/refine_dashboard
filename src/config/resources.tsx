import { DashOutlined, ProjectOutlined, ShopOutlined } from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

export const resources:IResourceItem[]=[
    /**
     * Aresource in Refine performs these actions:
     * list -> get all records (Read)
     * show ->get a single record (Read)
     * create -> create a record (Create)
     * delete ->delete a record (Delete)
     * or clone
     */
    {
        name:'dashboard',
        list:'/',
        meta:{
            label:'בקרה',//was ->label:'Dashboard'
            icon:<DashOutlined />
        }
    },
    {
        name:'companies',
        list:'/companies',
        show:'/companies/new',
        create: "/companies/new",
        edit:'/companies/edit/:id',
        meta:{
            label:'קבלנים/ ספקים',//->was label:'Companies'
            icon:<ShopOutlined />
        }
    },
    {
        name:'tasks',
        list:'/tasks',
        show:'/tasks/new',
        create: '/tasks/new',
        edit:'/tasks/edit/:id',
        meta:{
            label:'משימות',//was->label:'Tasks',
            icon:<ProjectOutlined />
        }
    }
]