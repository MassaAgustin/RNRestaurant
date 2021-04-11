import React from 'react'
import { connect } from 'react-redux'

import { ScrollView, Text } from 'react-native'
import { Card } from 'react-native-elements'

import { baseUrl } from '../shared/baseUrl'

import { Loading } from './Loading'

const mapStateToProps = state => {

    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

function RenderItem(props) {


    const { item, isLoading, errMess } = props

    if (isLoading) {
        return (
            <Card>
                <Loading />
            </Card>
        )
    } else {
        if (errMess) {
            return (
                <Card>
                    <Text>{errMess}</Text>
                </Card>
            )
        } else {
            return (
                <Card>
                    <Card.Image source={{ uri: baseUrl + item.image }} style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Card.FeaturedTitle >{item.name}</Card.FeaturedTitle>
                        <Card.FeaturedSubtitle >{item.designation}</Card.FeaturedSubtitle>
                    </Card.Image>
                    <Text style={{ margin: 10 }}>{item.description}</Text>
                </Card>
            )
        }
    }
}

const Home = (props) => {

    const { dishes, promotions, leaders } = props

    const itemDish = dishes.dishes.filter((dish) => dish.featured)
    const itemPromo = promotions.promotions.filter((promotion) => promotion.featured)
    const itemLeader = leaders.leaders.filter((leader) => leader.featured)

    return (
        <ScrollView>
            <RenderItem item={itemDish[0]} isLoading={dishes.isLoading} errMess={dishes.errMess} />
            <RenderItem item={itemPromo[0]} isLoading={promotions.isLoading} errMess={promotions.errMess} />
            <RenderItem item={itemLeader[0]} isLoading={leaders.isLoading} errMess={leaders.errMess} />
        </ScrollView>
    )
}

export default connect(mapStateToProps)(Home);
