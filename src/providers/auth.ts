// // page # 3 
// import type { AuthProvider } from "@refinedev/core";
// import type { User } from "../graphql/schema.types";

// import { API_URL, dataProvider } from "./data";

// /**
//  * For demo purposes and to make it easier to test the app, you can use the following credentials:
//  */
// export const authCredentials = {
//   email: "michael.scott@dundermifflin.com",
//   password: "demodemo",
// };

// export const authProvider: AuthProvider = {
  
//   login: async ({ email }) => {
//     try {
//         //call the login mutation
//         //dataprovider.custom is used to make a custom request to the Graphql API 
//         //this will call dataProvider which will go through the fetchWrapper function
//       const { data } = await dataProvider.custom({
//         url: API_URL,
//         method: "post",
//         headers: {},
//         meta: {
//           variables: { email },
//           //pass the email to see if the user exits and if so- return the accessTokn
//           rawQuery: `
//                 mutation Login($email: String!) {
//                     login(loginInput: {
//                       email: $email
//                     }) {
//                       accessToken,
//                     }
//                   }
//                 `,
//         },
//       });
//       //save the access token tothe localStorage
//       localStorage.setItem("access_token", data.login.accessToken);
//       console.log("Login Response:", data.login.accessToken);

//       return {
//         success: true,
//         redirectTo: "/",
//       };
      
//     } catch (e) {
//       const error = e as Error;
//       console.log(`got error: ${error.message}`);
      

//       return {
//         success: false,
//         error: {
//           message: "message" in error ? error.message : "Login failed",
//           name: "name" in error ? error.name : "Invalid email or password",
//         },
//       };
//     }
//   },
//   //simply remove the access token from the localstorage
//   logout: async () => {
//     localStorage.removeItem("access_token");

//     return {
//       success: true,
//       redirectTo: "/login",
//     };
//   },
//   //a check to see if the error is an authentication error - 
//   //if so , set the logout to true
//   onError: async (error) => {
//     if (error.statusCode === "UNAUTHENTICATED") {
//       console.log(error.message);
      
//       return {
//         logout: true,
//       };
//     }

//     return { error };
//   }
//   // onError: async (error) => {
//   //   console.log("Error caught:", error);
//   //   // Do nothing
//   //   return {};
//   // }
//   ,
//   // get the identity of the user 
//   // this is to know if the user isauthenticated or not
//   check: async () => {
//     const accessToken = localStorage.getItem("access_token");
//     try {
//       console.log("Check method called");
//       const response = await dataProvider.custom({
//         url: API_URL,
//         method: "post",
//         headers: {
//           Authorization: `Bearer ${accessToken}`, // Include the token in the header
//         },
//         meta: {
//           rawQuery: `
//             query Me {
//                 me {
//                   name
//                 }
//               }
//           `,
//         },
//       });
//       // console.log("Check response:", response);
//       return {
//         authenticated: true,
//         redirectTo: "/",
//       };
//     } catch (error) {
//       console.log("Check error:", error);
//       return {
//         authenticated: false,
//         redirectTo: "/login",
//       };
//     }
  
//   },
//   //get the user information
//   getIdentity: async () => {
//     const accessToken = localStorage.getItem("access_token");
//     console.log("get identity called");

//     try {
//       const { data } = await dataProvider.custom<{ me: User }>({
//         url: API_URL,
//         method: "post",
//         headers: accessToken
//           ? {
//             //send the access token in the Authorization header
//               Authorization: `Bearer ${accessToken}`,
//             }
//           : {},
//         meta: {//get the user information such as name, email, etc..
//           rawQuery: `
//                     query Me {
//                         me {
//                             id,
//                             name,
//                             email,
//                             phone,
//                             jobTitle,
//                             timezone
//                             avatarUrl
//                         }
//                       }
//                 `,
//         },
//       });
//       // console.log(data.me);
      
//       return data.me;
//     } catch (error) {
//       return undefined;
//     }
//   },
// };






//========>mock
import { AuthProvider } from "@refinedev/core";

const mockToken = "1234";
export const authCredentials = {
  email: "exampleMail@gmail.com",
  password: "anything",
};
export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    // Instead of making a real API call, we'll just set the mock token
    localStorage.setItem("token", mockToken);
    return {
      success: true,
      redirectTo: "/",
    };
  },
  logout: async () => {
    localStorage.removeItem("token");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem("token");
    if (token === mockToken) {
      return {
        authenticated: true,
      };
    }
    return {
      authenticated: false,
      error: new Error("Not authenticated"),
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem("token");
    if (token === mockToken) {
      return {
        id: 1,
        name: "Or Levi",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};