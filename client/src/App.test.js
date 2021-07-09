import ReactDOM from 'react-dom';
import AppContainer from './App.container';
import { shallow } from 'enzyme';

// it('App renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<AppContainer currentUser={null}/>, div);
// });

let appWithoutUser = null;
let appWithUser = null;

beforeEach(() => {
    const currentUser = {};
    appWithoutUser = shallow(<AppContainer currentUser={null} />);
    appWithUser = shallow(<AppContainer currentUser={currentUser} />);
});

it('renders AppContainer without crashing', () => {
    expect(appWithoutUser).toMatchSnapshot();
});

it('renders AppContainer with currentUser', () => {
    expect(appWithUser).toMatchSnapshot();
});
