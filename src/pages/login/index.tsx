// page #5
import { AuthPage } from "@refinedev/antd";
import { authCredentials } from "../../providers";

export const Login = () => {
  
  return (
    <AuthPage
      type="login"
      title={
        <h1
          style={{
            color: '#007bff', // Bright blue
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Shadow effect
          }}
        >
          MapFit Login
        </h1>
      }
      formProps={{
        initialValues:authCredentials,
      }}
    />
  );
};
