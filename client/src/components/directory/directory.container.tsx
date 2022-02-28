import { useAppSelector } from '../../redux/hooks';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import Directory from './directory.component';

export type Section = {
    title: string,
    imageUrl: string,
    imageUrlWebp: string,
    id?: number,
    linkUrl: string
}

const DirectoryContainer = (): JSX.Element => {
    const sections: Array<Section> = useAppSelector(selectDirectorySections);

    return (
        <Directory sections={sections} />
    )
};

export default DirectoryContainer;