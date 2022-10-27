import { useEffect } from "react"
import { useGamesContext } from "../hooks/useGamesContext"

// components
import GameDetails from "../components/GameDetails"
import GameForm from "../components/GameForm"

const Home = () => {
  const { games, dispatch } = useGamesContext()

  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch('/api/games')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_GAMES', payload: json})
      }
    }

    fetchGames()
  }, [dispatch])

  return (
    <div className="home">
      <div className="games">
        {games && games.map(game => (
          <GameDetails game={game} key={game._id} />
        ))}
      </div>
      <GameForm />
    </div>
  )
}

export default Home