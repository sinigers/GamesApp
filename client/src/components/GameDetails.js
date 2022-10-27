import { useGamesContext } from '../hooks/useGamesContext'

const GameDetails = ({ game }) => {
  const { dispatch } = useGamesContext()

  const handleClick = async () => {
    const response = await fetch('/api/games/' + game._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_GAME', payload: json})
    }
  }

  return (
    <div className="game-details">
      <h4>{game.title}</h4>
      <p><strong>Load (MB): </strong>{game.load}</p>
      <p><strong>Number of reps: </strong>{game.reps}</p>
      <p>{game.createdAt}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default GameDetails