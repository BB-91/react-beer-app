import { render, screen } from '@testing-library/react';
import BeerCard from "./BeerCard"
import beers from "../../data/beer"

test('renders learn react link', () => {
    render(<BeerCard beer={beers[0]}/>);
    const textElement = screen.getByText(beers[0].name);
    expect(textElement).toBeInTheDocument();
});