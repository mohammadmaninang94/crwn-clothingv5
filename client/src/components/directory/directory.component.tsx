import MenuItem from '../menu-item/menu-item.component';

import { DirectoryContainer } from './directory.styles';

import { Section } from './directory.container';

export type DirectoryProps = {
    sections: Array<Section>
}

const Directory = ({ sections }: DirectoryProps): JSX.Element => (
    <DirectoryContainer>
        {
            sections.map(({ id, ...otherProps } : Section) => (
                <MenuItem key={id} {...otherProps} />
            ))
        }
    </DirectoryContainer>
);


export default Directory;