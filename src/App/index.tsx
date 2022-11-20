import Box from '@mui/material/Box';
import { Suspense } from 'react';
import useFederatedComponent from 'src/hooks/useFederatedComponent';

const App: React.FC = () => {
  const { Component: MyRemoteApp, errorLoading } = useFederatedComponent(
    'http://localhost:8082/dist/remoteEntry.js',
    'MyRemoteApp',
    './App'
  );
  return (
    <>
      <Box> Host App</Box>
      <Suspense fallback={<Box>Loading...</Box>}>
        {errorLoading ? null : MyRemoteApp && <MyRemoteApp />}
      </Suspense>
    </>
  );
};

export default App;
