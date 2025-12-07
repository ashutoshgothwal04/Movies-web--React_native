import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri:
              poster_path && poster_path !== "null"
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "https://placehold.co/300x450/png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />


        <Text className="text-white text-sm font-bold mt-2" numberOfLines={1}>{title}</Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-white text-xs font-bold uppercase"> {Math.round(vote_average / 2)} </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-light-300 text-xs font-medium mt-1"> {release_date?.split("-")[0]}
          </Text>

        </View>

      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;


// import { icons } from "@/constants/icons";
// import { Link } from "expo-router";
// import React from "react";
// import { Image, Text, TouchableOpacity, View } from "react-native";

// const MovieCard = ({
//   id,
//   poster_path,
//   title,
//   vote_average,
//   release_date,
// }: Movie) => {
  
//   // 🔥 Prevents w500null, w500undefined, empty path
//   const posterUrl =
//     poster_path && poster_path !== "null" && poster_path !== ""
//       ? `https://image.tmdb.org/t/p/w500${poster_path}`
//       : "https://placehold.co/300x450/png";

//   return (
//     <Link href={`/movies/${id}`} asChild>
//       <TouchableOpacity className="w-[30%]">
        
//         {/* FIXED IMAGE */}
//         <Image
//           source={{ uri: posterUrl }}
//           className="w-full h-52 rounded-lg"
//           resizeMode="cover"
//         />

//         <Text className="text-white text-sm font-bold mt-2" numberOfLines={1}>
//           {title}
//         </Text>

//         <View className="flex-row items-center justify-start gap-x-1">
//           <Image source={icons.star} className="size-4" />
//           <Text className="text-white text-xs font-bold uppercase">
//             {Math.round(vote_average / 2)}
//           </Text>
//         </View>

//         <View className="flex-row items-center justify-between">
//           <Text className="text-light-300 text-xs font-medium mt-1">
//             {release_date?.split("-")[0]}
//           </Text>
//         </View>

//       </TouchableOpacity>
//     </Link>
//   );
// };

// export default MovieCard;
