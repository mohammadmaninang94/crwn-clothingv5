import React from 'react';
import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionStartAsync } from '../../redux/shop/shop.actions';

import CollectionPageContainer from '../collection-page/collection-page.container';
import CollectionOveriewContainer from '../../components/collections-overview/collections-overview.container';

class ShopPage extends React.Component {

    componentDidMount() {
        const { fetchCollectionStartAsync } = this.props;
        fetchCollectionStartAsync();
    }

    render() {
        const { match } = this.props;
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
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);