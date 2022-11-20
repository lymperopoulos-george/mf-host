import ReactDOM from 'react-dom';
import App from './App';
import { withTheme } from './theme';

const MyRemoteApp = withTheme(App);

ReactDOM.render(<MyRemoteApp />, document.getElementById('root'));
