const pokemonList = document.getElementById('pokemonList')

const maxRecords = 151
const limit = 1
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <div class="name-number">
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span>
            </div>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            </div>
            <img class="photo" src="${pokemon.photo}"
                 alt="${pokemon.name}">
            
            <div class="stats-container">
                <h3>Base Stats</h3>
                <ul class="stats-list">
                    ${pokemon.stats.map(stat => `
                        <li class="stat-item">
                            <span class="stat-name">${formatStatName(stat.name)}</span>
                            <div class="stat-bar-container">
                                <div class="stat-bar" style="width: ${(stat.value / 100) * 100}%">
                                    <span class="stat-value">${stat.value}</span>
                                </div>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </li>
    `
}

function formatStatName(statName) {
    return statName
        .replace('special-attack', 'Sp. Atk')
        .replace('special-defense', 'Sp. Def')
        .replace('attack', 'Attack')
        .replace('defense', 'Defense')
        .replace('speed', 'Speed')
        .replace('hp', 'HP');
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)