import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando page PokemonDetails', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const title = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(title).toBeInTheDocument();

    expect(moreDetails).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: 'Summary' });
    expect(summary).toBeInTheDocument();

    const paragraph = screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i);
    expect(paragraph).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const location = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(location).toBeInTheDocument();

    const altMaps = 'Pikachu location';
    const maps = screen.getAllByAltText(altMaps);
    expect(maps).toHaveLength(2);
    expect(maps[0].src).toBe('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[0].alt).toBe(altMaps);
    expect(maps[1].src).toBe('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(maps[1].alt).toBe(altMaps);

    const textMap1 = screen.getByText(/kanto viridian forest/i);
    expect(textMap1).toBeInTheDocument();

    const textMap2 = screen.getByText(/kanto power plant/i);
    expect(textMap2).toBeInTheDocument();
  });

  it('Teste se o usuário pode favoritar um Pokémon através da página de detalhes:', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    expect(moreDetails).not.toBeInTheDocument();

    const checkboxFavorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkboxFavorite).toBeInTheDocument();
    userEvent.click(checkboxFavorite);

    const imgPokemonFavorite = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(imgPokemonFavorite).toBeInTheDocument();
    userEvent.click(checkboxFavorite);
    expect(imgPokemonFavorite).not.toBeInTheDocument();
  });
});
