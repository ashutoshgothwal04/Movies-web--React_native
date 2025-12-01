import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const TrendingCard = ({movie: {movie_id, title, poster_url}, index} : TrendingCardProps) => {
  return (
   <Link href={`/movies/${movie_id}`} asChild>
   
   </Link>
  )
}

export default TrendingCard