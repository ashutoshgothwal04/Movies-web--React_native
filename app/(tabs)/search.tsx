import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState, version } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/usefetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import Searchbar from "@/components/Searchbar";
import { updateSearchCount } from "@/services/appwrite";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    reset,
    refetch: loadMovies,
  } = useFetch(() =>
    fetchMovies({
      query: searchQuery
    }), false
  );


  // Debounce the search (correct)
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies(); // fetch TMDB movies
      } else {
        reset();
      }
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // After movies are fetched → update Appwrite
  useEffect(() => {
    if (!searchQuery.trim()) return;
    if (!movies || movies.length === 0) return;
    if (moviesLoading) return;

    // update only for top movie
    if (movies?.length > 0 && movies?.[0]) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies, moviesLoading]);

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
              <Searchbar
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
                placeholder="Whats on your mind????" />
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

        ListEmptyComponent={
          !moviesError && !moviesLoading ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;