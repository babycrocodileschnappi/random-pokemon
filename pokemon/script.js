// const pokemonImage = document.getElementById('pokemon-image');
// const pokemonName = document.getElementById('pokemon-name');
// const pokemonType = document.getElementById('pokemon-type');
// const refreshButton = document.getElementById('refresh-button');

// const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

// async function fetchRandomPokemon() {
//   const randomId = Math.floor(Math.random() * 898) + 1; // There are 898 Pokémon in total
//   const response = await fetch(`${apiUrl}${randomId}`);
//   const data = await response.json();
//   return data;
// }

// async function updatePokemonInfo() {
//   const randomPokemon = await fetchRandomPokemon();
//   pokemonImage.src = randomPokemon.sprites.front_default;
//   //pokemonImage.src = randomPokemon.sprites.other.dream-world.front_default;
//   pokemonName.textContent = randomPokemon.name;
//   pokemonType.textContent = `Type: ${randomPokemon.types[0].type.name}`;
// }

// refreshButton.addEventListener('click', updatePokemonInfo);

// // Initial load
// updatePokemonInfo();


const pokemonImage = document.getElementById('pokemon-image');
const pokemonName = document.getElementById('pokemon-name');
const pokemonType = document.getElementById('pokemon-type');
const pokemonWeight = document.getElementById('pokemon-weight'); // Added
const pokemonHeight = document.getElementById('pokemon-height');
const refreshButton = document.getElementById('refresh-button');
const container = document.querySelector('.container'); // Get the container element

const imageUrlBase = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/';
const imageFormat = '.svg'; // Change this if a different image format is used

const colors = {
  fire: '#ff927d',
  grass: '#9ED29E',
  electric: '#ffcc33',
  water: '#0066B2',
  ground: '#f1dda0',
  rock: '#e1d08c',
  fairy: '#fbcbfb',
  poison: '#c689ba',
  bug: '#93AA39',
  dragon: '#a194ff',
  psychic: '#D9A2BB',
  flying: '#99bbff',
  fighting: '#dd9988',
  normal: '#e7e7d8',
  ghost: '#9f9fec',
  steel: '#dfdfe1',
  ice: '#dbf6ff',
  dark: '#bda396',
};


async function fetchRandomPokemon() {
  const randomId = Math.floor(Math.random() * 898) + 1; // There are 898 Pokémon in total
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
  const data = await response.json();
  return data;
}

async function updatePokemonInfo() {
  const randomPokemon = await fetchRandomPokemon();
  const pokemonId = randomPokemon.id;
  const imageUrl = `${imageUrlBase}${pokemonId}${imageFormat}`;
  const pokemonTypeColor = colors[randomPokemon.types[0].type.name] || '#ffffff'; // Default to white if no match

  // Set up error handler for the image
  pokemonImage.onerror = () => {
    updatePokemonInfo(); // Retry if image fails to load
  };

  pokemonImage.src = imageUrl;
  pokemonName.textContent = `Name: ${randomPokemon.name} `;
  pokemonType.textContent = `Type: ${randomPokemon.types[0].type.name}`;
  pokemonWeight.textContent = `Weight: ${randomPokemon.weight} kg`;
  pokemonHeight.textContent = `Height: ${randomPokemon.height} m`;

  container.style.backgroundColor = pokemonTypeColor;
}

refreshButton.addEventListener('click', updatePokemonInfo);

// Initial load
updatePokemonInfo();
