import { useEffect } from 'react';
import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionPageContainer from '../collection-page/collection-page.container';
import CollectionOveriewContainer from '../../components/collections-overview/collections-overview.container';

const ShopPage = ({ fetchCollectionsStart, match }) => {
    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);

    return (
        <Fragment>
            <Route exact path={match.path} render={() => {
                return (
                    <div className='shop-page'>
                        <CollectionOveriewContainer />
                    </div>
                )
            }} />
            <Route path={`${match.path}/:collectionId`} render={routerProps => <CollectionPageContainer {...routerProps} />} />
        </Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);