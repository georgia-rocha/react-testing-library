import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toBeInTheDocument();
    expect(namePokemon).toHaveTextContent('Pikachu');

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toBeInTheDocument();
    expect(typePokemon).toHaveTextContent('Electric');

    const weightPokemon = screen.getByTestId('pokemon-weight');
    expect(weightPokemon).toBeInTheDocument();
    expect(weightPokemon).toHaveTextContent('Average weight: 6.0 kg');

    const img = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';
    const imgPokemon = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(imgPokemon.src).toBe(img);
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. ', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');

    const title = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(title).toBeInTheDocument();
  });

  it('Teste se existe um ícone de estrela nos Pokémon favoritados:', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const checkboxFavorite = screen.getByRole('checkbox');
    expect(checkboxFavorite).toBeInTheDocument();
    userEvent.click(checkboxFavorite);

    const imgSrc = 'http://localhost/star-icon.svg';
    const imgPokemon = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(imgPokemon.src).toBe(imgSrc);
  });
});
