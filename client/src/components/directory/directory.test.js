import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import renderer from 'react-test-renderer';

import Directory from './directory.component';
import sections from '../../assests/data/sections.data';

describe('Directory component', () => {
    describe('Renders with', () => {
        let wrapper = null;

        beforeEach(() => {
            wrapper = render(
                <MemoryRouter>
                    <Directory sections={sections} />
                </MemoryRouter>
            );
        });

        test(`exact titles from props`, () => {
            for (var i = 0; sections.length > i; i++) {
                expect(wrapper.queryByTitle(sections[0].title)).toBeInTheDocument();
            }
        });

        test(`${sections.length} menu item component`, () => {
            expect(wrapper.queryAllByRole('heading')).toHaveLength(sections.length);
        });
    });

    test('renders correctly', () => {
        const tree = renderer
            .create(<MemoryRouter>
                <Directory sections={sections} />
            </MemoryRouter>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});