import { View, Image, ScrollView, Text } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails, fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";

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
            resizeMode="stretch"
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>
        </View>

        <View className="flex-row items-center gap-x-1 mt-2 ">
          <Text className="text-light-200 text-sm">
            {movie?.release_date?.split("-")?.[0]}
          </Text>
          <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
        </View>

        <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
          <Image source={icons.star} className="size-4" />
          <Text className="text-white font-bold text-sm">
            {Math.round(movie?.vote_average ?? 0)}/10
          </Text>
          <Text className="text-light-200 text-sm">
            (${movie?.vote_count} votes)
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MoviesDetails;
