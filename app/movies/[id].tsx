import { View, Image, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails, fetchMovies } from "@/services/api";

const MoviesDetails = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string),
  );

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MoviesDetails;
