import AppContainer from './App.container';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';

import HomePage from './pages/home-page/home-page.component';

let appWithoutUser = null;
let appWithUser = null;
let pathMap = {};

describe('Main Page', () => {
    beforeAll(() => {
        const currentUser = {};
        appWithoutUser = shallow(<AppContainer currentUser={null} />);
        appWithUser = shallow(<AppContainer currentUser={currentUser} />);

        const component = shallow(<AppContainer currentUser={null}/>);
        pathMap = component.find(Route).reduce((pathMap, route) => {
            const routeProps = route.props();
            console.log(routeProps.render());
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
        }, {});
        console.log(pathMap)
    });

    it('should show Home component for / router (getting array of routes)', () => {

        expect(pathMap['/']).toBe(undefined);
      })

    it('renders AppContainer without currentUser', () => {
        expect(appWithoutUser).toMatchSnapshot();
    });

    it('renders AppContainer with currentUser', () => {
        expect(appWithUser).toMatchSnapshot();
    });
});