import { createTheme, ThemeProvider } from '@mui/material/styles';

export const theme = createTheme({});

export interface WithThemeProps {}
export const withTheme = <T,>(
  WrappedComponent: React.ComponentType<T>
): React.ComponentType<T & WithThemeProps> => {
  const WithTheme = (props: any) => (
    <ThemeProvider theme={theme}>
      <WrappedComponent {...props} />
    </ThemeProvider>
  );
  WithTheme.displayName = `WithTheme(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;
  return WithTheme;
};

export default theme;
