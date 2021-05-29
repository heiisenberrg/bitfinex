import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

const Home = ({ props }) => {
    return (
       <View style={{ flex: 1, padding: 20}}>
           <Text>Home</Text>
       </View>
    )
}

const mapStateToProps = (state) => ({
    tickers: state.home.tickers
});

const mapDispatchToProps = (dispatch) => ({
    getTickers: () => dispatch(getTickers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);