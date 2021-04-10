import React from 'react'
import { connect } from 'react-redux'

import { ScrollView, View, Text } from 'react-native'
import { Card } from 'react-native-elements'

import { baseUrl } from '../shared/baseUrl'

const mapStateToProps = state => {

    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

function RenderItem(props) {
    const item = props.item

    const imageURL = `${baseUrl}images/uthappizza.png`

    if (item != null) {
        return (
            <Card>
                <Card.FeaturedTitle>{item.name}</Card.FeaturedTitle>
                <Card.FeaturedSubtitle>{item.designation}</Card.FeaturedSubtitle>
                <Card.Image source={{ uri: imageURL }} />
                <Text style={{ margin: 10 }}>{item.description}</Text>
            </Card>
        )
    } else {
        return (View)
    }
}

const Home = (props) => {

    const { dishes } = props.dishes
    const { promotions } = props.promotions
    const { leaders } = props.leaders

    return (

        <ScrollView>
            <RenderItem item={dishes.filter((dish) => dish.featured)} />
            <RenderItem item={promotions.filter((promo) => promo.featured)} />
            <RenderItem item={leaders.filter((leader) => leader.featured)} />
        </ScrollView>

    )
}

export default connect(mapStateToProps)(Home);
