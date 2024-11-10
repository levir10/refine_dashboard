
import { useTasks } from 'TaskContext'; // Use context
import React, { useEffect, useState } from "react"; // Manage states
import { Button, Form, Space } from "antd";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";

type Props = {
  initialValues: {
    description?: string;
  };
  cancelForm: () => void;
};

export const DescriptionForm = ({ initialValues, cancelForm }: Props) => {
  const [description, setDescription] = useState<string | undefined>(initialValues?.description || "");
  const [isSaving, setIsSaving] = useState(false);
  const { selectedTaskId, refreshTasks } = useTasks();

  // Handle description save to MongoDB
  const saveDescription = async (newDescription: string) => {
    if (selectedTaskId) {
      setIsSaving(true);
      try {
        // Make an API request to update the task description
        // await axios.put(`http://localhost:3000/tasks/${selectedTaskId}`, {
        await axios.put(`https://refine-dashboard-5.onrender.com/tasks/${selectedTaskId}`, {
          description: newDescription,
        });
        refreshTasks(); // Refresh the tasks after updating
      } catch (error) {
        console.error("Error updating task description:", error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  useEffect(() => {
    setDescription(initialValues?.description || ""); // Sync with the initial values
  }, [initialValues.description]);

  const handleSaveClick = () => {
    if (description) {
      saveDescription(description); // Save the current description
    }
  };

  return (
    <>
      <Form initialValues={initialValues}>
        <Form.Item noStyle name="description">
          <MDEditor
            value={description}
            onChange={(value) => setDescription(value || "")} // Set the description on change
            preview="edit"
            data-color-mode="light"
            height={250}
          />
        </Form.Item>
      </Form>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          marginTop: "12px",
        }}
      >
        <Space>
          <Button type="default" onClick={cancelForm}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleSaveClick} loading={isSaving}>
            Save
          </Button>
        </Space>
      </div>
    </>
  );
};

// import { useForm } from "@refinedev/antd";
// import { HttpError } from "@refinedev/core";
// import { GetFields, GetVariables } from "@refinedev/nestjs-query";

// import MDEditor from "@uiw/react-md-editor";
// import { Button, Form, Space } from "antd";

// import { Task } from "@/graphql/schema.types";
// import {
//   UpdateTaskMutation,
//   UpdateTaskMutationVariables,
// } from "@/graphql/types";

// import { UPDATE_TASK_MUTATION } from "@/graphql/mutations";

// type Props = {
//   initialValues: {
//     description?: Task["description"];
//   };
//   cancelForm: () => void;
// };

// export const DescriptionForm = ({ initialValues, cancelForm }: Props) => {
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
//     Pick<GetVariables<UpdateTaskMutationVariables>, "description">
//   >({
//     queryOptions: {
//       // we are disabling the query because we don't want to fetch the data on component mount.
//       enabled: false, // disable the query
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
//     <>
//       <Form {...formProps} initialValues={initialValues}>
//         <Form.Item noStyle name="description">
//           <MDEditor preview="edit" data-color-mode="light" height={250} />
//         </Form.Item>
//       </Form>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "end",
//           marginTop: "12px",
//         }}
//       >
//         <Space>
//           <Button type="default" onClick={cancelForm}>
//             Cancel
//           </Button>
//           <Button {...saveButtonProps} type="primary">
//             Save
//           </Button>
//         </Space>
//       </div>
//     </>
//   );
// };
