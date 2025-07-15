import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  const router = useRouter();
  const { data: movies, error, isLoading, reset, refetch } = useFetch(
    () => fetchMovies({ query: "" })
  );
  console.log(movies);
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="w-full absolute z-0" />
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : error ? (
          <Text>Error: {error.message}</Text>
        ): (
          <View className="flex-1 mt-5">
            <SearchBar
              placeholder="Search for a movie"
              onPress={() => router.push("/search")}
            />

            <>
              <Text className="text-lg text-white mt-5 mb-3 font-bold">
                Latest Movies
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
