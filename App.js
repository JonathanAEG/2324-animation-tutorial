import React,{useEffect, useState} from 'react';
import { FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {AppLoading} from 'expo';
import { useFonts } from 'expo-font';
import styled from 'styled-components';
import Rating from './components/Rating';
import Genre from './components/Genre';
import getMovies from './api';
import * as CONSTANTS from './constants';

const Container = styled.View`
  flex: 1;
`
const PosterContainer = styled.View`
  width: ${CONSTANTS.ITEM_SIZE}px;
`

const Poster = styled.View`
  margin:0 ${CONSTANTS.SPACING*2}px ${CONSTANTS.SPACING*2}px 0;
  padding: ${CONSTANTS.SPACING*2}px;
  align-items: center;
  background-color: #FFFFFF;
  border-radius: 10px;
`

const PosterImage = styled.Image`

  width: 100%;
  height: ${CONSTANTS.ITEM_SIZE*1.2}px;
  /*  */
  border-radius: 10px;
  margin: 0 0 10px 0;
`

const PosterTitle = styled.Text`
  font-family: Syne-Mono;
  font-size: 18px;
`

const PosterDescription = styled.Text`
font-family: Syne-Mono;
font-size: 12px;
`

export default function App() {

  const [movies, setMovies] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(()=>{

    const fetchData = async()=>{
      const data = await getMovies()

      setMovies(data)
      setLoaded(true)
    }
    fetchData();
  },[])

  let[fontLoaded] = useFonts({
    'Syne-Mono': require('./assets/fonts/SyneMono-Regular.ttf'),
  });

  if(!loaded || !fontLoaded){
    return (<Container/>)
  }else{

    return(

      <Container>
        <StatusBar/>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={movies}
          keyExtractor={item=>item.key}
          horizontal
          contentContainerStyle={{alignItems:'center'}}
          renderItem={({item})=>{
            return(
              <PosterContainer>
                <Poster>
                  <PosterImage source={{uri:item.posterPath}} />
                  <PosterTitle numberOfLines={1}>{item.originalTitle}</PosterTitle>
                  {/* <Rating rating={item.voteAverage} /> */}
                  <PosterDescription numberOfLines={5} > {item.description} </PosterDescription>
                </Poster>
              </PosterContainer>

            )
          }}
        />
      </Container>
    )
  }

}
