import { useState, useLayoutEffect} from 'react';
import type { BrowserHistory } from 'history';
import { Router } from 'react-router-dom';

export type HistoryRouterProps = {
  history: BrowserHistory;
  basename?: string;
  children?: React.ReactNode;
}

function HistoryRouter({
  history,
  basename,
  children,
}: HistoryRouterProps) {
  // console.log(history, basename, children);

  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}

export default HistoryRouter;
