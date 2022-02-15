
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import { MemoryRouter } from "react-router-dom";
import renderer from 'react-test-renderer';

import Header from './header.component';

describe('Header rendering', () => {
    const mockStore = configureStore([]);
    const wrapper = (store) => {
        return (<Provider store={store}>
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        </Provider>)
    };
    const renderComponent = (state) => {
        const store = mockStore(state);
        return [
            render(wrapper(store)),
            store,
        ]
    };

    test('initial render should display sign in button and cart 0', () => {
        const [{ getByRole, queryByRole, queryByText }, store] = renderComponent({
            user: {
                currentUser: null,
                signInMessage: null,
                signUpMessage: null,
                signOutMessage: null,
            },
            cart: {
                hidden: true,
                sidebar: true,
                items: []
            }
        });

        // console.log(queryByText(store.getState().cart.items.length.toString()));
        // console.log(store.getState().cart.items.length.toString());

        expect(getByRole('link', { name: /sign in/i })).toBeInTheDocument();
        expect(queryByRole('link', { name: /sign out/i })).not.toBeInTheDocument();
        expect(queryByText(store.getState().cart.items.length.toString())).toBeInTheDocument();


        const tree = renderer
            .create(wrapper(store))
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('initial render should display sign out button and with cart items count', () => {
        const [{ queryByText }, store] = renderComponent({
            user: {
                currentUser: {},
                signInMessage: null,
                signUpMessage: null,
                signOutMessage: null,
            },
            cart: {
                hidden: true,
                sidebar: true,
                items: [{
                    imageUrl: '/images/shop-img/jackets/black-shearling.png',
                    name: 'Black Jean Shearling',
                    id: 18, price: 125,
                    quantity: 1
                }]
            }
        });

        expect(queryByText(/sign in/i)).not.toBeInTheDocument();
        expect(queryByText(/sign out/i)).toBeInTheDocument();
        expect(queryByText(store.getState().cart.items.length.toString())).toBeInTheDocument();

        const tree = renderer
            .create(wrapper(store))
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});