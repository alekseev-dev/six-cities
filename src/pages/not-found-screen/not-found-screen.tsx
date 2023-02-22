import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';

function NotFoundScreen(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 Cities. Page not found</title>
      </Helmet>
      <Logo />
      <h1>Page not found</h1>
    </>
  );
}

export default NotFoundScreen;
