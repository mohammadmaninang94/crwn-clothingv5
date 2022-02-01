import Directory from './directory.component';
import sections from '../../assests/data/sections.data'; 

import { shallow } from 'enzyme';

test('Render Directory', () => {
    const directory = shallow(<Directory sections={sections} />);
    expect(directory).toMatchSnapshot();
});