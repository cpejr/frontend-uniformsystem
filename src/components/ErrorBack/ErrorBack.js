import { useHistory } from 'react-router-dom';

function ErrorBack() {
  const history = useHistory();
  return history.push('Error');
}

export default ErrorBack;
