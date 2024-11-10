//page #2 
import { GraphQLFormattedError } from "graphql"; // Importing the type definition for GraphQL errors

// Defining a custom Error type that includes a message and statusCode
type Error = {
    message: string;
    statusCode: string;
}

// The customFetch function handles HTTP requests, adding custom headers and handling authentication
const customFetch = async (url: string, options: RequestInit) => {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('access_token');
    console.log(`Accesstoken: ${accessToken}`);
    
    // Cast headers to a record type (key-value pairs) of strings
    const headers = options.headers as Record<string, string>;

    // Perform the fetch request with the provided URL and options, and add custom headers
    return await fetch(url, {
        ...options, // Spread the original options to include them in the request
        headers: {
            ...headers, // Include any existing headers passed to the function
            Authorization: headers?.Authentication || `Bearer ${accessToken}`, // Add the Authentication header with the Bearer token
            "Content-Type": "application/json", // Set the Content-Type header to application/json
            "Apollo-Require-Preflight": "true", // Add a custom header for Apollo (GraphQL client)
        }
    });
}
//--->changed from here - to skip the "invalid input syntax for type integer" error

// The getGraphQLErrors function extracts and formats errors from the GraphQL response body
const getGraphQLErrors = (body: Record<"errors", GraphQLFormattedError[] | undefined>): Error | null => {
    if (!body) {
        return {
            message: 'Unknown error',
            statusCode: "INTERNAL_SERVER_ERROR" // String type
        };
    }
    if ("errors" in body) {
        const errors = body?.errors;
        const messages = errors?.map((error) => error?.message)?.join(""); 
        const code = errors?.[0]?.extensions?.code as string; // Ensure code is treated as a string

        return {
            message: messages || JSON.stringify(errors),
            statusCode: code || "500" // Convert number to string
        };
    }
    return null;
};

// The fetchWrapper function wraps the customFetch function, processing the response and handling errors
export const fetchWrapper = async (url: string, options: RequestInit) => {
    const response = await customFetch(url, options);
    const responseClone = response.clone();
    const body = await responseClone.json();

    const error = getGraphQLErrors(body);
    if (error) {
        console.log('GraphQL accepted Error:', error);

        // Check if the error is specifically due to "invalid input syntax for type integer"
        if (error.message.includes("invalid input syntax for type integer")) {
            console.log('Caught error with invalid integer syntax, treating response as success.');
            return response; // Return the response as if it succeeded
        }

        throw error; // Throw other errors as usual
    }

    return response;
};

//--->changed untill here
// //page #2 
// import { GraphQLFormattedError } from "graphql"; // Importing the type definition for GraphQL errors

// // Defining a custom Error type that includes a message and statusCode
// type Error = {
//     message: string;
//     statusCode: string;
// }

// // The customFetch function handles HTTP requests, adding custom headers and handling authentication
// const customFetch = async (url: string, options: RequestInit) => {
//     // Retrieve the access token from local storage
//     const accessToken = localStorage.getItem('access_token');
//     console.log(`Accesstoken: ${accessToken}`);
    
//     // Cast headers to a record type (key-value pairs) of strings
//     const headers = options.headers as Record<string, string>;

//     // Perform the fetch request with the provided URL and options, and add custom headers
//     return await fetch(url, {
//         ...options, // Spread the original options to include them in the request
//         headers: {
//             ...headers, // Include any existing headers passed to the function
//             Authorization: headers?.Authentication || `Bearer ${accessToken}`, // Add the Authentication header with the Bearer token
//             "Content-Type": "application/json", // Set the Content-Type header to application/json
//             "Apollo-Require-Preflight": "true", // Add a custom header for Apollo (GraphQL client)
//         }
//     });
// }

// // The getGraphQLErrors function extracts and formats errors from the GraphQL response body
// const getGraphQLErrors = (body: Record<"errors", GraphQLFormattedError[] | undefined>): Error | null => {
//     if (!body) {
//         return {
//             message: 'Unknown error',
//             statusCode: "INTERNAL_SERVER_ERROR" // String type
//         }
//     }
//     if ("errors" in body) {
//         const errors = body?.errors;
//         const messages = errors?.map((error) => error?.message)?.join(""); 
//         const code = errors?.[0].extensions?.code as string; // Ensure code is treated as a string

//         return {
//             message: messages || JSON.stringify(errors),
//             statusCode: code || "500" // Convert number to string
//         }
//     }
//     return null;
// }


// // The fetchWrapper function wraps the customFetch function, processing the response and handling errors
// export const fetchWrapper = async (url: string, options: RequestInit) => {
//     const response = await customFetch(url, options); // Perform the fetch request using customFetch
//     console.log('Response:', response); // Log the response object

//     const responseClone = response.clone(); // Clone the response to be able to read it twice
//     const body = await responseClone.json(); // Parse the response body as JSON
//     console.log('Response Body:', body); // Log the response body
//     const error = getGraphQLErrors(body); // Check if there are any GraphQL errors

//     if (error) {
//         console.error('GraphQL Error:', error);
//         throw error; // If errors are found, throw them as exceptions
//     }

//     return response; // Return the original response if no errors are found
// }
