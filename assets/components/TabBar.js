import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const TabBar = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <View style={styles.container}>
            {tabs.map((tab, index) => (
                <TouchableOpacity
                    key={tab}
                    style={[styles.tab, activeTab === index && styles.activeTab]}
                    onPress={() => setActiveTab(index)}
                >
                    <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>
                        {tab}
                    </Text>
                </TouchableOpacity>
            ))}
            <View
                style={[
                    styles.arrow,
                    {
                        left: activeTab * (100 / tabs.length) + 50 / tabs.length,
                        backgroundColor: tabs[activeTab].color
                    }
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
    },
    tab: {
        width: '20%',
        alignItems: 'center',
        padding: 8
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#333'
    },
    tabText: {
        fontWeight: 'bold'
    },
    activeTabText: {
        color: '#333'
    },
    arrow: {
        width: 0,
        height: 0,
        borderLeftWidth: 7,
        borderRightWidth: 7,
        borderBottomWidth: 7,
        borderStyle: 'solid',
        bottom: -7,
        position: 'absolute',
        transform: [{ rotate: '45deg' }]
    }
});

