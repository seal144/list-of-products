import { Typography } from '@mui/material';
import { red } from '@mui/material/colors';

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <Typography sx={(theme) => ({ color: red[500], textAlign: 'center', padding: theme.spacing(2) })}>
      ! {message} !
    </Typography>
  );
};

export default ErrorMessage;
