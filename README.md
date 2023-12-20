# Aniwrapped 🎁

Aniwrapped is a next.js application that uses TailwindCSS for styling. 😎

It provides a way for anime watchers to view and compare their statistics based on AniList data. 📊

Users can input their username to retrieve their viewing statistics, compare hours watched with friends, and discover common and unique shows in their viewing history. 😆


## Table of contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [AniList API Integration](#anilist-api-integration)
- [Codebase Overview](#codebase-overview)

## Getting Started

### Prerequisites
First, ensure you have these installed:
- npm
- node.js

### Installation

#### Clone the rep
```bash
git clone https://github.com/gOskari/aniwrapped.git
```
#### Install NPM packages
```bash
npm install
```
#### Start the dev server
```bash
npm run dev
```

## Usage

### Home page
Input your AniList username in the search box to show profile page

### Profile page 
Displays your avatar, username, hours watched, anime watched and a radar chart of your genres watched versus the average user.

### Leaderboard page
See who of your friends have watched the most hours

### Compare page
Compare what you and your friend have watched in common and what's unique as well as your ratings

## AniList API Integration

Aniwrapped gets user data from the AniList API. For more info see the [AniList API documentation](https://anilist.gitbook.io/anilist-apiv2-docs/)

### Fetching Data

We use GraphQL queries to get data from AniList. An example query:

```bash
const query = gql`
    query ($name: String) {
      User(name: $name) {
        id
        name
        avatar {
          large
          medium
        }
        statistics {
          anime {
            count
            minutesWatched
            genres {
              genre
              count
            }
          }
        }
      }
    }
  `;
```

## Codebase Overview

#### 'app/' all components and pages  
- 'profile/[name]' dynamic route
#### 'styles/' custom styles and theming for our TailwindCSS setup
#### 'lib/' universal functions


##
