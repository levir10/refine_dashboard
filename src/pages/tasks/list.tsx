//this is the kanban skeleton with all the lists of data in it
import { KanbanColumnSkeleton, ProjectCardSkeleton } from '@/components'
import { KanbanAddCardButton } from '@/components/tasks/kanban/add-card-button'
import { KanbanBoardContainer,KanbanBoard} from '@/components/tasks/kanban/board'
import ProjectCard, { ProjectCardMemo } from '@/components/tasks/kanban/card'
import KanbanColumn from '@/components/tasks/kanban/column'
import KanbanItem from '@/components/tasks/kanban/item'
import { UPDATE_TASK_MUTATION } from '@/graphql/mutations'
import { TASKS_QUERY, TASK_STAGES_QUERY } from '@/graphql/queries'
import { TasksQuery, TaskStagesQuery } from '@/graphql/types'
import { DragEndEvent } from '@dnd-kit/core'
import { useList, useNavigation, useUpdate } from '@refinedev/core'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import React from 'react'

type Task = GetFieldsFromList<TasksQuery>
type TaskStage = GetFieldsFromList<TaskStagesQuery> & {tasks:Task[]}

const List = ({children}:React.PropsWithChildren) => {
  const {replace} =useNavigation();
  //Ferch a list that fetches the stages in the kanban board- where the tasks are sorted in 
  const {data:stages,isLoading:isLoadingStages} = useList<TaskStage>({
      resource:'taskStages',
      filters:[
        {
          field:'title',
          operator:'in',
          value:['TODO','IN PROGRESS','IN REVIEW','DONE']
        
        }
      ],
      sorters:[        {
        field:'createdAt',
        order:'asc'
      }],

      pagination:{
        mode:'off'
      },
      meta:{
        gqlQuery:TASK_STAGES_QUERY
      }
  })
  //all tof the tasks
  const {data:tasks,isLoading:isLoadingTasks} = useList<GetFieldsFromList<TasksQuery>>({
    resource:'tasks',
    sorters:[
      {
        field:'dueDate',
        order:'asc',
      }
    ],
    queryOptions:{
      enabled:!!stages,// only feth tasks when stages exsists, and fetched.
  },
    pagination:{
      mode:'off'
    },
    meta:{
      gqlQuery:TASKS_QUERY
    }
  })
//mutate the location of the task after dragging and dropping:
const {mutate:updateTask}= useUpdate();
  //groupe tasks by stages
  const tasksStages=React.useMemo(()=>{ // memorise the result, so that its not recalculatet each render, but only when stages or tasks change
    if(!tasks?.data || !stages?.data){
      return{
        unassignedStage:[],
        stages:[]
      }
    }
    //if WE DO HAVE the tasks, if the task id is null we know is unassigned.
    const unassignedStage=tasks.data.filter((task)=>task.stageId===null)
    //groupe those tasks together by creating a variable:
    const grouped:TaskStage[] = stages.data.map((stage) => ({
      ...stage,
      tasks:tasks.data.filter((task)=>task.stageId?.toString()===stage.id)
    }))

    return{
      unassignedStage,
      columns:grouped
    }
  },[stages,tasks])
//Handles adding new card with the circular + button 
const handleAddCard = (args:{stageId:string})=>{
  const path=args.stageId==='unassigned'// if its unassigned
  ?'/tasks/new'//if unassigned: create new task
  :`/tasks/new?stageId=${args.stageId}`//if assignd- 

  replace(path) //replace the path once we add a new card.
}

//handle dragging motion ( what would happen after dragging)
const handleOnDragEnd =(event:DragEndEvent)=>{
//Yhis function will update task stage when the task is drag and drop
let stageId =event.over?.id as undefined | string | null// what is the stage ?? 
const taskId = event.active.id as string //what is the task that is being draged
const taskStageId = event.active.data.current?.stageId//what is the stage id that the task is being dragged TO 

if (taskStageId===stageId) return //do nothing if we dragged to the same stage
if(stageId==='unassigned'){
  stageId=null 
}

updateTask({
  resource:'tasks',
  id:taskId,
  values:{
    stageId:stageId,
  },
  successNotification:false,
  mutationMode:'optimistic',// its going to look like it mooved before i actually updated in the database
  meta:{
    gqlMutation:UPDATE_TASK_MUTATION
  }
})
}

const isLoading=isLoadingStages || isLoadingTasks;

if(isLoading) return <PageSkeleton/>
  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard onDragEnd={handleOnDragEnd}>
          <KanbanColumn
            id="unassigned"
            title={"unassigned"}
            count={tasksStages.unassignedStage.length || 0}
            onAddClick={() => handleAddCard({ stageId: 'unassigned' })} description={undefined}>
         {tasksStages.unassignedStage.map((task)=>(
          <KanbanItem key={task.id} id={task.id}
          data={{...task,stageId:'unassigned'}}
          >
            <ProjectCardMemo //we use the ProjectCardMemo instead of the ProjectCard - because we want to render only the parent that moves between stages, not the cotent in it
            {...task}
            dueDate={task.dueDate ||undefined}
            />
          </KanbanItem>
         ))}
         {!tasksStages.unassignedStage.length && (
          <KanbanAddCardButton
          onClick={()=>
          handleAddCard({stageId:'unassigned'})}
          />
         )}
          </KanbanColumn>
          {tasksStages.columns?.map((column) =>(
            <KanbanColumn
            key={column.id}
            id={column.id}
            description={null}
            title={column.title}
            count={column.tasks.length}
            onAddClick={() =>handleAddCard({stageId:column.id})}
            >
          {/* now render the cards inside each column */}
          {!isLoading && column.tasks.map((task)=>(
            <KanbanItem key={task.id} id={task.id} data={task}>
              <ProjectCardMemo 
              {...task}
              dueDate={task.dueDate || undefined}/>
            </KanbanItem>
          ))}
          {/* if there is nothing in a column - give the possibility to add new card */}
          {!column.tasks.length && (
             <KanbanAddCardButton
             onClick={()=>
             handleAddCard({stageId:column.id})}
             />
          )}

            </KanbanColumn>
          ))}
        </KanbanBoard>
      </KanbanBoardContainer>
      {children}
    </>
  )
}

export default List

//what would nbe rendered when isLoading
const PageSkeleton = ()=>{
  const columnCount =6;//columns
  const itemCount=4;//cards

  return(
    <KanbanBoardContainer>
      {Array.from({length:columnCount}).map((_,index) =>(
        <KanbanColumnSkeleton key={index}>
          {Array.from({length:itemCount}).map((_,index)=>(
            <ProjectCardSkeleton key={index}/>
          ))}
        </KanbanColumnSkeleton>
      ))}
    </KanbanBoardContainer>
  )
}