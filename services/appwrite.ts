// import { Client, Databases, ID, Query } from "react-native-appwrite";

// const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
// const TABLE_ID  = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!; // old

// const client = new Client()
//   .setEndpoint("https://sgp.cloud.appwrite.io/v1")
//   .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
//   .setPlatform('host.exp.exponent'); // IMPORTANT FOR EXPO

// const database = new Databases(client);

// export const updateSearchCount = async (query: string, movie: Movie) => {
//   try {
//     const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
//       Query.equal("searchTerm", query),
//     ]);

//     if (result.documents.length > 0) {
//       const existingMovie = result.documents[0];

//       await database.updateDocument(
//         DATABASE_ID,
//         TABLE_ID,
//         existingMovie.$id,
//         {
//           count: existingMovie.count + 1,
//         }
//       );
//     } else {
//       await database.createDocument(
//         DATABASE_ID,
//         TABLE_ID,
//         ID.unique(),
//         {
//           searchTerm: query,
//           movie_id: movie.id,
//           title: movie.title,
//           count: 1,
//           poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//         }
//       );
//     }
//   } catch (error) {
//     console.error("Error updating search count:", error);
//     throw error;
//   }
// };

// export const getTrendingMovies = async () => {
//   try {
//     const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
//       Query.orderDesc("count"),
//       Query.limit(5),
//     ]);

//     return result.documents;
//   } catch (error) {
//     console.error(error);
//     return undefined;
//   }
// };

import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://sgp.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform("host.exp.exponent");

const database = new Databases(client);

// Define the interface for the movie object
interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    // 1. Find existing search row (Requires Index on 'searchTerm')
    const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const item = result.documents[0];

      // 2. Update existing row
      await database.updateDocument(DATABASE_ID, TABLE_ID, item.$id, {
        count: item.count + 1,
      });
    } else {
      // 3. Insert new row
      await database.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id, // Ensure this is a number matching your Integer column
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        count: 1,
      });
    }
  } catch (error) {
    console.error("Appwrite Insert Error:", error);
  }
};

export const getTrendingMovies = async () => {
  try {
    // Requires Index on 'count'
    const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
      Query.orderDesc("count"),
      Query.limit(5),
    ]);
    return result.documents;
  } catch (error) {
    console.error("Trending Fetch Error:", error);
    return [];
  }
};
