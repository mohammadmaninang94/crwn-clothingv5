import MenuItem from '../menu-item/menu-item.component';

import { DirectoryContainer } from './directory.styles';

const Directory = ({ sections }) => (
    <DirectoryContainer>
        {
            sections.map(({ id, ...otherProps }) => (
                <MenuItem key={id} {...otherProps} />
            ))
        }
    </DirectoryContainer>
);


export default Directory;