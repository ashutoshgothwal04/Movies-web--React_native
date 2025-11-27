import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useState, version } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/usefetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import Searchbar from "@/components/Searchbar";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: searchQuery
    }), false
  );

  return (
    <View className="flex-1 bg-primary">
      <Image
        className="flex-1 absolute w-full z-0"
        source={images.bg}
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <Searchbar placeholder="Whats on your mind????" />
            </View>
            {/* // if movie loading then show loading (ActivityIndicator) */}
            {moviesLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}
            {/* // if movie occur error then show error msg */}
            {moviesError && (
              <Text className="text-red-500 px-5 my-3">
                Error : {moviesError.message};
              </Text>
            )}


            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              movies!.length > 0 && <Text className="text-xl font-bold">
                Search Result for {' '}
                <Text className="text-accent font-bold">
                  {searchQuery}
                </Text>
                </Text>}
          </>
        }
      />
    </View>
  );
};

export default Search;