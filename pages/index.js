import Head from 'next/head'
import { apiURL } from '../libs/pokemon-api';
import React from 'react';

export default function Home() {
  const [pokemonName, setPokemonName] = React.useState("mewtwo")
  const [pokemon, setPokemon] = React.useState()
  const [pokemonSpriteList, setPokemonSpriteList] = React.useState([])
  const [pokemonSprite, setPokemonSprite] = React.useState("dream_world")
  const handleFormSubmission = React.useCallback(async () => {
    const response = await fetch(apiURL(pokemonName));
    const data = await response.json()
    setPokemon(data)
    setPokemonSpriteList(Object.keys(data.sprites.other))
    setPokemonSprite("dream_world")
  }, [pokemonName])
  React.useEffect(() => {
    handleFormSubmission();
  }, [])
  const pokemonUrl = pokemon?.sprites?.other?.[pokemonSprite]?.front_default ?? pokemon?.sprites?.other?.["official-artwork"]?.front_default;
  return (
    <div className="container">
      <Head>
        <title>Official Unofficial Pokedex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Official Unofficial Pokedex</a>
        </h1>
        <img src={pokemonUrl} />
        <form onSubmit={(e) => {
          e.preventDefault()
          handleFormSubmission()
        }}>
          <input name='pokemonName' onChange={(e) => {
            setPokemonName(e.target.value.toLowerCase())
          }} />
          <select name='pokemonSprite' value={pokemonSprite} onChange={(e) => {
              setPokemonSprite(e.target.value)
            }}>
            {pokemonSpriteList.map((sprite) => (<option key={sprite} value={sprite}>{sprite}</option>))}
          </select>
        </form>
        {process.env.NODE_ENV==="development"&&<pre>
          {JSON.stringify(pokemonUrl, undefined, 2)}
          {JSON.stringify(pokemonSpriteList, undefined, 2)}
        </pre>}
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
