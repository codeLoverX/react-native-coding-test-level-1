
import React, { useState } from "react";
import { View, ScrollView, Dimensions, TouchableHighlight, Image } from "react-native";
import {
    Layout,
    TextInput,
    useTheme,
    Button,
} from "react-native-rapi-ui";
import TopNavCustom from '../components/TopNav';
import { FontAwesome } from "@expo/vector-icons";

const { height: windowHeight, width: windowWidth } = Dimensions.get('window')
console.log({ windowHeight, windowWidth })
export default function ({ searchText, setSearchText, page, setPage, searchPokemon, children }) {
    const theme = useTheme();
    let pagingation = Array(4).fill(0).map((_, index) => {
        return Number(page) + index;
    });
    const [goToPage, setGoToPage] = useState(Number(page));
    return (
        <Layout>
            <ScrollView nestedScrollEnabled={true} >
                <TopNavCustom
                    middleContentName="Home"
                />
                <View
                    style={{ padding: 10, alignItems: "center", justifyContent: "center" }}>
                    <Image
                        style={{
                            width: windowWidth,
                            height: windowWidth * 1 / 3,
                        }}
                        source={require('../../assets/pngegg.png')}
                    />
                </View>
                <View
                    style={{
                        marginTop: 10, justifyContent: "center", flexDirection: 'row', flexWrap: 'wrap'
                    }}
                >
                    {page === 1 ?
                        <Button color={theme.gray900} text="Previous" onPress={() => setPage((prev) => Number(prev) - 1)} />
                        :
                        <Button color={theme.gray300} text="Previous" onPress={() => null} />
                    }
                    {pagingation.map((value) => {
                        return (
                            <Button text={`${value}`} key={`buttoPagination${value}`} onPress={() => setPage(value)} />
                        )
                    })}
                    <Button color={theme.gray900} text="Next" onPress={() => setPage((prev) => Number(prev) + 1)} />

                </View>
                <View
                    style={{
                        marginTop: 10, paddingLeft: windowWidth / 4, paddingRight: windowWidth / 4, flexDirection: 'row', justifyContent: "center", alignItems: "center",
                    }}
                >
                    <TextInput
                        placeholder="Page number"
                        value={`${goToPage}`}
                        onChangeText={(value) => setGoToPage(value)}
                        textAlign={'center'}
                        size='small' />
                    < Button color={theme.gray300} text="Go to" onPress={() => setPage(goToPage)} />
                </View>
                <View
                    style={{
                        marginTop: 10, paddingLeft: 20, paddingRight: 20, justifyContent: "center", alignItems: "center",
                    }}
                >
                    <TextInput
                        placeholder="Search for a pokemon"
                        style={{
                            paddingLeft: 15
                        }}
                        value={searchText}
                        onChangeText={(value) => setSearchText(value)}
                        leftContent={
                            <TouchableHighlight
                                onPress={() => {
                                    searchPokemon(searchText);
                                }}
                            >
                                <FontAwesome name="search" size={24} color="black" />
                            </TouchableHighlight>
                        }
                    />
                </View>
                {children}
            </ScrollView>
        </Layout>
    )
}