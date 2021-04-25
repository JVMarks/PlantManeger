import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { FlatList } from 'react-native-gesture-handler';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';

import { Load } from '../components/Load';
import { PlantProps } from '../libs/storage';
import { Header } from '../components/Header';
import { EnviromentButton } from '../components/EviromentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';

import api from '../services/api';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

interface EnviromentsProps {
  key: string;
  title: string;
}

export function PlantSelect() {

  //navegação
  const navigation = useNavigation();

  //estado para funcionamento do menu 
  const [enviroments, setEnviroments] = useState<EnviromentsProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [enviromentsSelected, setEnviromentsSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  //const [loadingAll, setLoadingAll] = useState(false);

  function handleEnviromentSelected(environment: string) {
    setEnviromentsSelected(environment);

    if (environment == 'all')
      return setFilteredPlants(plants);


    const filtered = plants.filter(plant =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  }

  async function fetchPlants() {
    const { data } = await api
      .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
    if (!data) {
      return setLoading(true);
    }
    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data])
      setFilteredPlants(oldValue => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  function handleFethMores(distance: number) {
    if (distance < 1)
      return;


    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  function handlePlantSelect(plant: PlantProps) {
    navigation.navigate('PlantSave', { plant });
  }

  //menu de filtros
  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api
        .get('plants_environments?_sort=title&_order=asc');
      setEnviroments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data
      ]);
    }
    fetchEnviroment();
  }, [])

  //menu por planta
  useEffect(() => {
    fetchPlants();
  }, [])

  if (loading)
    return <Load />

  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <Header />

        <Text style={styles.title}>
          Em qual ambiente
      </Text>
        <Text style={styles.subtitle}>
          Você quer colocar sua planta?
      </Text>
      </View>

      <View>
        <FlatList
          data={enviroments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              active={item.key === enviromentsSelected}
              onPress={() => handleEnviromentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => handleFethMores(distanceFromEnd)}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} />
              : <></>
          }
        //contentContainerStyle={styles.contentContainerStyle}
        />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.text,
    lineHeight: 20,
  },
  enviromentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  },
});