import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testando Pokedex', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const PokedexText = screen.getByRole('heading', { name: /Encountered Pokémon/i });
    expect(PokedexText).toBeInTheDocument();

    const buttonNext = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(buttonNext).toBeInTheDocument();

    pokemonList.forEach((_pokemon, index) => {
      const nextPokemon = screen.getByTestId('pokemon-name');
      userEvent.click(buttonNext);
      if (index < pokemonList.length - 1) {
        expect(nextPokemon).toHaveTextContent(pokemonList[index + 1].name);
      } else {
        expect(nextPokemon).toHaveTextContent(pokemonList[0].name);
      }
    });
  });

  it('Teste se é mostrado apenas um Pokémon por vez;', () => {
    const { container } = renderWithRouter(<App />);
    expect(container.getElementsByClassName('pokemon-overview').length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);
    const filter = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const filterButton = screen.getAllByTestId('pokemon-type-button');

    filter.forEach((type, index) => {
      expect(filterButton[index]).toHaveTextContent(type);
    });

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);

    const buttonNext = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(buttonNext).toBeInTheDocument();

    pokemonList.forEach((_pokemon, index) => {
      const nextPokemon = screen.getByTestId('pokemon-name');
      userEvent.click(buttonNext);
      if (index < pokemonList.length - 1) {
        expect(nextPokemon).toHaveTextContent(pokemonList[index + 1].name);
      }
    });
  });
});
