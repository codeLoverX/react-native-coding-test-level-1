import React, { useState, useEffect, createContext, useReducer } from "react";
import {
  View, TouchableHighlight, StyleSheet, Modal, Alert, SafeAreaView, ScrollView, FlatList, ActivityIndicator, Dimensions
} from "react-native";
import {
  Text,
} from "react-native-rapi-ui";

import axios from "axios";
import PokedexTopLayout from "../components/PokedexTopLayout";
import { FontAwesome } from '@expo/vector-icons';
import TopNav from "../components/TopNav";


export default function ({ navigation }) {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let numPokemons = 20;
  function searchPokemon(searchText) {
    searchText = String(searchText).toLowerCase();
    setIsLoading(true);
    setPage(1);
    let searchUrl = `https://pokeapi.co/api/v2/pokemon/${searchText}`;
    axios.get(searchUrl)
      .then((response) => {
        if (response.status == 200) {
          setPokemons([{ name: searchText, url: searchUrl }])
        }
      })
      .catch((err) => { console.log({ err }) })
      .finally(() => { setIsLoading(false); })
  }
  // context for eliminating 2-way and nested data transfer
  // reducer for setstate in context

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * numPokemons}&limit=${numPokemons}`)
      .then((response) => {
        let { results } = response.data;
        setPokemons(results);
        setIsLoading(false);
      })
      .catch((err) => { console.log({ err }) })
  }, [page])
  if (!isLoading && pokemons.length === 0) {
    return (
      <>
        <PokedexTopLayout {...{ page, setPage, searchText, setSearchText, searchPokemon }} >
          <Text>Couldn't fetch data</Text>
        </PokedexTopLayout>
      </>
    );
  }
  return (
    <>
      <PokedexTopLayout {...{ page, setPage, searchText, setSearchText, searchPokemon }} >
        {isLoading ?
          <View>
            <ActivityIndicator animating={true} size="large" color="red" />
          </View>
          :
          <>
            <SafeAreaView style={{ flex: 1, marginVertical: 5, padding: 10 }}>
              {pokemons.map((item, index) =>

                <TouchableHighlight
                  key={`${item.name}${index}`}
                  onPress={() => {
                    axios.get(item.url).then((response) => {
                      let {
                        name, stats
                      } = response.data;
                      stats = stats.map((value) =>
                        [value['stat']["name"], value['base_stat']]
                      )
                      let newPokemonDetail = {
                        name,
                        sprite: response.data['sprites']['front_default'],
                        stats
                      }
                      setPokemonDetail({ ...newPokemonDetail })
                      console.log({ newPokemonDetail })
                    })
                      .catch((err) => { console.log({ err }) })
                  }}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                  }}>
                  <Text >{item.name}</Text>
                </TouchableHighlight>
              )}

            </SafeAreaView>
          </>}

        {pokemonDetail && <>
          <Modal
            propagateSwipe={true}
            animationType="slide"
            transparent={true}
            visible={pokemonDetail !== null}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setPokemonDetail(null);
            }}
          >
          </Modal>
        </>}
      </PokedexTopLayout >

    </>

  )
}
        

