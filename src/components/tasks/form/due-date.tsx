import { useForm } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";
import { GetFields, GetVariables } from "@refinedev/nestjs-query";
import MDEditor from "@uiw/react-md-editor";

import { Button, DatePicker, Form, Space } from "antd";
import dayjs from "dayjs";
import { useTasks } from 'TaskContext'; // Use context
import React, { useEffect, useState } from "react"; // Manage states
import axios from "axios";// HTTP requests
import { Task } from "@/graphql/schema.types";


type Props = {
  initialValues: {
    dueDate?: Task["dueDate"];
  };
  cancelForm: () => void;
};

export const DueDateForm = ({ initialValues, cancelForm }: Props) => {
  // set up variables
  const [dueDate, setDueDate] = useState<string | undefined>(initialValues?.dueDate || "");
  const [isSaving, setIsSaving] = useState(false);
  const { selectedTaskId, refreshTasks } = useTasks();

  // Handle duedate save to MongoDB
  const saveDueDate= async (newDueDate: string) => {
    if (selectedTaskId) {
      setIsSaving(true);
      try {
        // Make an API request to update the task description
        // await axios.put(`http://localhost:3000/tasks/${selectedTaskId}`, {
        await axios.put(`https://refine-dashboard-5.onrender.com/tasks/${selectedTaskId}`, {
          dueDate: newDueDate,
        });
        refreshTasks(); // Refresh the tasks after updating
      } catch (error) {
        console.error("Error updating task DueDate:", error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  useEffect(() => {
    setDueDate(initialValues?.dueDate || ""); // Sync with the initial values
  }, [initialValues.dueDate]);

  const handleSaveClick = () => {
    if (dueDate) {
      saveDueDate(initialValues?.dueDate || ""); // Save the current duedate
    }
  };


  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Form  initialValues={initialValues}>
        <Form.Item
          noStyle
          name="dueDate"
          getValueProps={(value) => {
            if (!value) return { value: undefined };
            initialValues.dueDate=value
            return { value: dayjs(value) };
          }}
          
        >
          <DatePicker
            format="YYYY-MM-DD HH:mm"
            showTime={{
              showSecond: false,
              format: "HH:mm",
            }}
            style={{ backgroundColor: "#fff" }}
          />
        </Form.Item>
      </Form>
      <Space>
        <Button type="default" onClick={cancelForm}>
          Cancel
        </Button>
        <Button  type="primary" onClick={handleSaveClick} loading={isSaving}>
          Save
        </Button>
      </Space>
    </div>
  );
};
// import { useForm } from "@refinedev/antd";
// import { HttpError } from "@refinedev/core";
// import { GetFields, GetVariables } from "@refinedev/nestjs-query";

// import { Button, DatePicker, Form, Space } from "antd";
// import dayjs from "dayjs";

// import { Task } from "@/graphql/schema.types";
// import {
//   UpdateTaskMutation,
//   UpdateTaskMutationVariables,
// } from "@/graphql/types";

// import { UPDATE_TASK_MUTATION } from "@/graphql/mutations";

// type Props = {
//   initialValues: {
//     dueDate?: Task["dueDate"];
//   };
//   cancelForm: () => void;
// };

// export const DueDateForm = ({ initialValues, cancelForm }: Props) => {
//   // use the useForm hook to manage the form
//   // formProps contains all the props that we need to pass to the form (initialValues, onSubmit, etc.)
//   // saveButtonProps contains all the props that we need to pass to the save button
//   const { formProps, saveButtonProps } = useForm<
//     GetFields<UpdateTaskMutation>,
//     HttpError,
//     /**
//      * Pick is a utility type from typescript that allows you to create a new type from an existing type by picking some properties from it.
//      * https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
//      *
//      * Pick<Type, Keys>
//      * Type -> the type from which we want to pick the properties
//      * Keys -> the properties that we want to pick
//      */
//     Pick<GetVariables<UpdateTaskMutationVariables>, "dueDate">
//   >({
//     queryOptions: {
//       // disable the query to prevent fetching data on component mount
//       enabled: false,
//     },
//     redirect: false, // disable redirection
//     // when the mutation is successful, call the cancelForm function to close the form
//     onMutationSuccess: () => {
//       cancelForm();
//     },
//     // specify the mutation that should be performed
//     meta: {
//       gqlMutation: UPDATE_TASK_MUTATION,
//     },
//   });

//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//       }}
//     >
//       <Form {...formProps} initialValues={initialValues}>
//         <Form.Item
//           noStyle
//           name="dueDate"
//           getValueProps={(value) => {
//             if (!value) return { value: undefined };
//             return { value: dayjs(value) };
//           }}
//         >
//           <DatePicker
//             format="YYYY-MM-DD HH:mm"
//             showTime={{
//               showSecond: false,
//               format: "HH:mm",
//             }}
//             style={{ backgroundColor: "#fff" }}
//           />
//         </Form.Item>
//       </Form>
//       <Space>
//         <Button type="default" onClick={cancelForm}>
//           Cancel
//         </Button>
//         <Button {...saveButtonProps} type="primary">
//           Save
//         </Button>
//       </Space>
//     </div>
//   );
// };
