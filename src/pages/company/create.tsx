import SelectOptionWithAvatar from '@/components/select-option-with-avater'
import { CREATE_COMPANY_MUTATION } from '@/graphql/mutations'
import { USERS_SELECT_QUERY } from '@/graphql/queries'
import { UsersSelectQuery } from '@/graphql/types'
import { useModalForm,useSelect } from '@refinedev/antd'
import { useGo } from '@refinedev/core'
import { userFriendlySecond } from '@refinedev/core/dist/definitions'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { Form, Input, Modal, Select } from 'antd'
import React from 'react'
import { CompanyList } from './list'

const Create = () => {
  const go=useGo();

  const goToListPage = () => {
    go({
      to:{resource:'companies',action:'list'},// go back to the list
      options:{keepQuery:true},//
      type:'replace',// its a modal.. we just close it
    
    })
  }


  const {formProps,modalProps} = useModalForm({
    action:'create',//create new companies
    defaultVisible:true,// we are already in the create page. so true
    resource:'companies',//
    redirect:false,//we are already in create. so false
    mutationMode:'pessimistic',// passimistic= redirection is wxecuted only After mutation is successful 
    onMutationSuccess:goToListPage,
    meta:{
      gqlMutation: CREATE_COMPANY_MUTATION
    }
  })

//the data for the dropdown in the modal
const {selectProps,query} = useSelect<GetFieldsFromList<UsersSelectQuery>>({
  resource:'users',
  optionLabel:'name',
  meta:{
    gqlQuery:USERS_SELECT_QUERY
  }
});

  return (
   <CompanyList>
    <Modal
      {...modalProps}
      mask={true}
      onCancel={goToListPage}
      title="צור קבלן חדש"
      width={512}
      >
        <Form {...formProps} layout="vertical">
          <Form.Item
          label="שם קבלן"
          name="name"
          rules={[{required:true}]}
          >
            <Input placeholder="בבקשה הכניסו שם קבלן"/>
          </Form.Item>
          <Form.Item
          label="דיסציפלינה"
          name="salesOwnerId"
          rules={[{required:true}]}
          >
            <Select
            placeholder="בבקשה בחרו דיסציפלינה"// for the dropdown in the modal for create company
            {...selectProps}
            options={
              query.data?.data.map((user) =>({
                value:user.id,
                label:(
                  <SelectOptionWithAvatar
                  name={user.name}
                  avatarUrl={user.avatarUrl ?? undefined}
                  />
                )
              }))??[]
            }
            />

          </Form.Item>
        </Form>
    </Modal>
   </CompanyList>
  )
}

export default Create