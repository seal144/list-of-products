import { PropsWithChildren } from 'react';
import { Container as ContainerMui, styled } from '@mui/material';

const Background = styled('div')((theme) => ({
  backgroundColor: '#282c34',
}));

const Container = styled(ContainerMui)(({ theme }) => ({
  minHeight: '100vh',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Background>
      <Container fixed>{children}</Container>
    </Background>
  );
};

export default Layout;
