# DIVERSIFY!

## Background and Overview

Many coins in the cryptosphere are highly correlated. Diversify! is a tool that compares the correlations of different coins, allowing the user to optimally 'diversify' their crypto investments.

The app will visually depict the correlation of whichever coins the user selects, and will also suggest coins that are most inversely correlated with the users' current portfolio.

## Functionality and MVP

In Diversify!, users will be able to:

- [ ] Select which coin or coins they own
- [ ] Learn which coins move contrariwise to their current holdings
- [ ] Reset their held coins
- [ ] View an about modal explaining the functionality of the app

## Wireframes

The app will consist of a single page which displays a search bar with a drop-down menu and a graph. Users will be able to search for their coins and add them to the graph, which will display a separate line graph for each coin they choose. After they select all their coins they can click a "Diversify" button which will reveal the best coin they can add to their portfolio and will add its line to the graph.

![Wireframe](https://i.imgur.com/DIKPmZN.png)

## Technologies

The app will user the following:
- Vanilla JS for structure and calculations
- HTML5 Canvas for graph rendering
- COINAPI.io to get coin price data

## Timeline

1. Setup modules, learn COINAPI.io and calculate correlations of different coins
2. Render price histories to a graph using Canvas
3. Implement search function and display multiple coins
4. Suggest best coin given user's current portfolio, and render it on the chart
