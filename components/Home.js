import React from 'react'
import { connect } from 'react-redux'

import { View, I18nManager } from 'react-native'

import { RenderItem } from './RenderItem'

const mapStateToProps = state => {

    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const Home = (props) => {

    const { dishes, promotions, leaders } = props

    const itemDish = dishes.dishes.filter((dish) => dish.featured)
    const itemPromo = promotions.promotions.filter((promotion) => promotion.featured)
    const itemLeader = leaders.leaders.filter((leader) => leader.featured)

    return (
        <View style={{ flex: 1, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row', justifyContent: 'center' }}>
            <RenderItem item={itemDish[0]} isLoading={dishes.isLoading} errMess={dishes.errMess} pos={1} />
            <RenderItem item={itemPromo[0]} isLoading={promotions.isLoading} errMess={promotions.errMess} pos={2} />
            <RenderItem item={itemLeader[0]} isLoading={leaders.isLoading} errMess={leaders.errMess} pos={3} />
        </View>
    )
}

export default connect(mapStateToProps)(Home);
