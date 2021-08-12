import { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import Spinner from '../../components/spinner/spinner.component';

import { ShopPageContainer } from './shop-page.styles';

const CollectionPageContainer = lazy(() => import('../collection-page/collection-page.container'));
const CollectionOveriewContainer = lazy(() => import('../../components/collections-overview/collections-overview.container'));

const ShopPage = ({ fetchCollectionsStart, match }) => {
    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);

    return (
        <ShopPageContainer>
            <Suspense fallback={<Spinner />}>
                <Route exact path={match.path} render={() => {
                    return (
                        <div className='shop-page'>
                            <CollectionOveriewContainer />
                        </div>
                    )
                }} />
                <Route path={`${match.path}/:collectionId`} render={routerProps => <CollectionPageContainer {...routerProps} />} />
            </Suspense>
        </ShopPageContainer>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);