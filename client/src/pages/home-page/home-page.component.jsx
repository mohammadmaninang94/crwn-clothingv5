import { Profiler } from 'react';
import Directory from '../../components/directory/directory.component';

const HomePage = () => (
    <Profiler id='Directory' onRender={(id, phase, actualDuration) => {
        console.log({id, phase, actualDuration});
    }}>
        <Directory />
    </Profiler>
);

export default HomePage;