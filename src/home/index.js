import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { BTCSvg, ETHSvg, DOGESvg, XRPSvg, USTSvg, LiveOnSvg, LiveOffSvg } from '../../assets/svg';
import { getTickers } from './actions';

const Home = ({ getTickers, tickers }) => {
    console.warn('inside', tickers);
    const [isLive, setIsLive] = useState(false);
    const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
    useEffect(() => {
        getTickers();
    }, []);

    useEffect(() => {
       if (isLive) {
        socket.onopen = () => //, 'tETHUSD', 'tDOGE:USD', 'tUSTUSD', 'tXRPUSD'
          {
            ['tBTCUSD'].forEach(s => {
               socket.send(JSON.stringify({ event: 'subscribe', channel: 'ticker', symbol: s }))
            })
          }
        
        socket.onmessage = ({ data }) => console.warn('onmesssgae', data)
       }
    }, [isLive]);

    const getDetails = (item) => {
        switch (item[0]) {
            case 'tBTCUSD':
                return {
                    name: 'BTC',
                    Icon: BTCSvg,
                    volume: item[8],
                    high: item[9],
                    low: item[10],
                    price: item[3],
                    lastPrice: Math.abs(item[5]).toFixed(2),
                    latPriceChangePercentage: Math.abs((item[6] * 100)).toFixed(2),
                    isNegative: Math.sign(item[6]) === -1
                };
            case 'tETHUSD':
                return {
                    name: 'ETH',
                    Icon: ETHSvg,
                    volume: item[8],
                    high: item[9],
                    low: item[10],
                    price: item[3],
                    lastPrice: Math.abs(item[5]).toFixed(2),
                    latPriceChangePercentage: Math.abs((item[6] * 100)).toFixed(2),
                    isNegative: Math.sign(item[6]) === -1
                };
            case 'tDOGE:USD':
                return {
                    name: 'DOGE',
                    Icon: DOGESvg,
                    volume: item[8],
                    high: item[9],
                    low: item[10],
                    price: item[3],
                    lastPrice: Math.abs(item[5]).toFixed(2),
                    latPriceChangePercentage: Math.abs((item[6] * 100)).toFixed(2),
                    isNegative: Math.sign(item[6]) === -1
                };
            case 'tUSTUSD':
                return {
                    name: 'USDt',
                    Icon: USTSvg,
                    volume: item[8],
                    high: item[9],
                    low: item[10],
                    price: item[3],
                    lastPrice: Math.abs(item[5]).toFixed(2),
                    latPriceChangePercentage: Math.abs((item[6] * 100)).toFixed(2),
                    isNegative: Math.sign(item[6]) === -1
                };
            case 'tXRPUSD':
                return {
                    name: 'XRP',
                    Icon: XRPSvg,
                    volume: item[8],
                    high: item[9],
                    low: item[10],
                    price: item[3],
                    lastPrice: Math.abs(item[5]).toFixed(2),
                    latPriceChangePercentage: Math.abs((item[6] * 100)).toFixed(2),
                    isNegative: Math.sign(item[6]) === -1
                };

        }
    }

    renderItem = ({ item, index }) => {
        const { name, Icon, volume, high, low, price, lastPrice, latPriceChangePercentage, isNegative } = getDetails(item);
        return (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 4, backgroundColor: '#1c242b', paddingVertical: 12, marginBottom: 12, paddingHorizontal: 8 }}>
                <Icon />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 12 }}>
                    <View>
                        <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600', textDecorationLine: 'underline' }}>{name}/USD</Text>
                        <Text style={{ marginVertical: 6 }}>
                            <Text style={{ color: '#868a8c', fontSize: 12 }}>VOL   </Text>
                            <Text style={{ color: '#fff', fontSize: 12 }}>{parseInt(volume)} </Text>
                            <Text style={{ color: '#868a8c', fontSize: 12, textDecorationLine: 'underline' }}>{name}</Text>
                        </Text>
                        <Text>
                            <Text style={{ color: '#868a8c', fontSize: 12 }}>LOW  </Text>
                            <Text style={{ color: '#fff', fontSize: 12 }}>{low}</Text>
                        </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>{price}</Text>
                        <Text style={{ marginVertical: 6, color: isNegative ? '#e93a46' : '#136c53', fontSize: 12 }}>{lastPrice} ({latPriceChangePercentage}%)</Text>
                        <Text>
                            <Text style={{ color: '#868a8c' }}>HIGH  </Text>
                            <Text style={{ color: '#fff', fontSize: 12 }}>{high}</Text>
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, paddingVertical: 28, paddingHorizontal: 20, backgroundColor: '#1d2931' }}>
            <View style={{ marginVertical: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 24, fontWeight: '700', color: '#fff', textAlign: 'center' }}>Tickers</Text>
                <TouchableOpacity onPress={() => setIsLive(!isLive)}>
                    {
                        isLive ? <LiveOnSvg /> : <LiveOffSvg />
                    }
                </TouchableOpacity>
            </View>
            <FlatList
                data={tickers}
                contentContainerStyle={{ paddingVertical: 20 }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(_, index) => `${index}`}
                extraData={tickers}
                renderItem={renderItem}
            />
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