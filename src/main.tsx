import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider, MaterialDesignContent } from 'notistack';
import { styled } from '@mui/material';
import { severities } from './styles/colors.ts';

const styles = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent': {
    height: 64,
    color: 'black',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '27px',
    letterSpacing: '1px',
    minWidth: 448,
  },
  '&.notistack-MuiContent-success': {
    backgroundColor: `${severities.info}`,
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: `${severities.error}`,
  },
}));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SnackbarProvider
    autoHideDuration={7000}
    Components={{
      success: styles,
      error: styles,
    }}
    maxSnack={5}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SnackbarProvider>
);
