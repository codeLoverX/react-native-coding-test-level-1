import React, { useContext } from "react";
import {
    View, TouchableHighlight, StyleSheet, ScrollView, Image, Dimensions
} from "react-native";
import {
    Text, Button
} from "react-native-rapi-ui";
import { BarChart } from 'react-native-chart-kit';
import { Table, Row, Rows, TableWrapper, } from 'react-native-table-component';
import { FontAwesome } from '@expo/vector-icons';
import { PrinterContext } from "../state/printReducer";
import * as Print from 'expo-print';
import ViewShotChildren from "./ViewShot";


const { height: windowHeight, width: windowWidth } = Dimensions.get('window')
export default function ModalView({ pokemonDetail, setPokemonDetail }) {
    const [printerState, dispatchPrinterState] = useContext(PrinterContext);
    console.log(printerState.jpgScreenShotUrl)
    
    return (
        <>
            <ScrollView contentContainerStyle={styles.modalView}>
                <ViewShotChildren>

                    <TouchableHighlight>
                        {/* TouchableHighlight MUST HAVE ONLY ONE CHILD */}
                        <View >
                            <TouchableHighlight
                                style={{ alignSelf: 'center' }}

                                onPress={() => {
                                    setPokemonDetail(null)
                                }}
                            >
                                <FontAwesome name="close" size={24} color="black" />
                            </TouchableHighlight>

                            <Image
                                style={{
                                    width: 200,
                                    height: 200,
                                    alignSelf: 'center'
                                }}
                                source={{ uri: pokemonDetail.sprite }}
                            />

                            <Text style={{
                                fontWeight: 'bold', alignSelf: 'center'
                            }}>
                                {pokemonDetail.name}
                            </Text>
                            {/*  */}
                            {/* data={pokemonDetail.stats} */}
                            <View style={{ flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' }}>
                                <Table borderStyle={{ borderWidth: 1 }}>
                                    <Row
                                        data={['Stat Name', 'Base Stat']}
                                        flexArr={[2, 1]}
                                        style={{
                                            height: 60, width: 200, backgroundColor: '#f1f8ff'
                                        }}
                                        textStyle={{ textAlign: 'center', padding: 5 }}
                                    />
                                    <TableWrapper
                                        style={{ flexDirection: 'row' }}>
                                        <Rows
                                            data={pokemonDetail.stats}
                                            flexArr={[2, 1]}
                                            style={{ height: 40, width: 200 }}
                                            textStyle={{ textAlign: 'center', padding: 5 }}
                                        />
                                    </TableWrapper>
                                </Table>
                            </View>
                            <ScrollView horizontal={true}
                                style={{ alignSelf: 'center' }}>
                                <TouchableHighlight>
                                    <BarChart
                                        horizontal={false}
                                        data={{
                                            labels: pokemonDetail.stats.map((value) => [value[0]]),
                                            datasets: [
                                                {
                                                    data: pokemonDetail.stats.map((value) => value[1]),
                                                },
                                            ],
                                        }}
                                        width={450}
                                        height={220}

                                        chartConfig={{
                                            backgroundColor: '#1cc910',
                                            backgroundGradientFrom: '#eff3ff',
                                            backgroundGradientTo: '#efefef',
                                            decimalPlaces: 2,
                                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                            alignSelf: 'center',
                                        }}

                                    />
                                </TouchableHighlight>


                            </ScrollView>
                            <Button title='Print SS Method' onPress={async () => {
                                dispatchPrinterState({ type: 'ALLOW_SCREENSHOT' })
                            }} />
                            {Platform.OS === 'ios' &&
                                <>
                                    <View style={{ height: 8 }} />
                                    <Button title='Select printer' onPress={async () => {
                                        const printerforIOS = await Print.selectPrinterAsync(); // iOS only
                                        dispatchPrinterState({
                                            type: "SELECT_PRINTER_IF_IOS",
                                            payload: { printerforIOS }
                                        })

                                    }} />
                                    <View style={{ height: 8 }} />
                                    {printerState.printerforIOS ? <Text style={{ textAlign: 'center' }}>{`Selected printer: ${selectedPrinter.name}`}</Text> : undefined}
                                </>
                            }
                        </View>
                    </TouchableHighlight>
                </ViewShotChildren>

            </ScrollView >
        </>
    )
}


const styles = StyleSheet.create({

    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        width: windowWidth * 0.8,
        alignSelf: 'center',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

});