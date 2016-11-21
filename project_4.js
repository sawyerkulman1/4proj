
/**
 * * @author Kulman, Sawyer (@Kulmans@student.ncmich.edu)
 *@version 0.0.1
 * Created by sawyer on 11/14/2016.
 *@todo
 */

"use strict";
const PROMPT = require('readline-sync');
const COLUMNS = 4, TITLE = 0, RATING = 1, TOTAL_RATING = 2, NUM_RATINGS = 3, MIN_RATING = 0, MAX_RATING = 5;

let whichTask, averageRating, movieRatingPick, rating;
let movies = [];

function main() {
    const NEW_RATING = 0;
    let infinite = 0;
    while (infinite < 1) {
        if (movies.length < 1) {
            populateMovies();
            setWhichTask();
        } else {
            setWhichTask();
            if (whichTask === NEW_RATING) {
                populateMovies();
            } else {
                chooseMovieRating();
                setAverageRatings();
                printRatings();}
        }
    }
}

main();

function setWhichTask() {
    while (typeof whichTask === 'undefined' || isNaN(whichTask) || whichTask < 0 || whichTask > 1) {
        whichTask = Number(PROMPT.question(`\nWhat would you like to do? [0=Enter a movie, 1=Display average ratings]: `));
    }
}

function populateMovies() {
    movies[movies.length] = [];
    let moviePick, newTitle;
    for (let i = 0; i < movies.length; i++) {
        console.log(`\t${i} = ${movies[i][TITLE]}`);
        newTitle = i;
    }
    while (typeof moviePick === 'undefined' || isNaN(moviePick) || moviePick < 0 || moviePick > movies.length) {
        moviePick = Number(PROMPT.question(`\nPlease enter a movie's number or enter ${newTitle} to enter your own movie: `));
    }
    if (moviePick != newTitle) {
        for (let i = 0; i < COLUMNS; i++) {
            if (i === TITLE) {
                movies[moviePick][TITLE] = movies[moviePick][TITLE];
            } else if (i === RATING) {
                while (isNaN(rating) || rating < MIN_RATING || rating > MAX_RATING) {
                    rating = Number(PROMPT.question(`\nPlease enter your rating for ${movies[moviePick][TITLE]} [0 = WORST, 5 = BEST]: `));
                }
            } else if (i === TOTAL_RATING) {
                if (movies.length == 1){
                    movies[moviePick][TOTAL_RATING] = Number(rating);
                } else {
                    movies[moviePick][TOTAL_RATING] = Number(Number(movies[moviePick][TOTAL_RATING]) + Number(rating));
                }
            } else if (i === NUM_RATINGS) {
                if (movies.length == 1){
                    movies[moviePick][NUM_RATINGS] = 1;
                } else {
                    movies[moviePick][NUM_RATINGS] = Number(movies[moviePick][NUM_RATINGS]++);
                }
            }
        }
    } else {
        for (let i = 0; i < COLUMNS; i++) {
            if (i === TITLE) {
                while (typeof movies[newTitle][TITLE] === 'undefined' || !/(^[a-zA-Z0-9 ]+$){1,35}/i.test(movies[newTitle][TITLE])) {
                    movies[newTitle][TITLE] = PROMPT.question(`\nEnter the title of the movie you'd like to rate: `)
                }
            } else if (i === RATING) {
                while (typeof rating === 'undefined' || isNaN(rating) || rating < MIN_RATING || rating > MAX_RATING) {
                    rating = Number(PROMPT.question(`\nPlease enter movie rating (0-5 stars): `));
                }
            } else if (i === TOTAL_RATING) {
                if (movies.length == 1){
                    movies[newTitle][TOTAL_RATING] = Number(rating);
                } else {
                    movies[newTitle][TOTAL_RATING] = Number(Number(movies[newTitle][TOTAL_RATING]) + Number(rating));
                }
            } else if (i === NUM_RATINGS) {
                if (movies.length == 1){
                    movies[newTitle][NUM_RATINGS] = 1;
                } else {
                    movies[newTitle][NUM_RATINGS] = Number(movies[newTitle][NUM_RATINGS]++);
                }
            }
        }
    }
    whichTask = -1; rating = -1;
    return setWhichTask();
}

function chooseMovieRating() {
    while (typeof movieRatingPick === 'undefined' || isNaN(movieRatingPick) || movieRatingPick < 0 || movieRatingPick > movies.length - 1) {
        for (let i = 0; i < movies.length; i++) {
            console.log(`\t${i} = ${movies[i][TITLE]}`);
        }
        movieRatingPick = Number(PROMPT.question("enter a movie's number to see its rating: "));
    }
}

function setAverageRatings() {
    averageRating = Number(movies[movieRatingPick][TOTAL_RATING]) / Number(movies[movieRatingPick][NUM_RATINGS]);
}

function printRatings() {
    console.log(`The average rating for ${movies[movieRatingPick][TITLE]} is ${averageRating}`);
    whichTask = -1;
    return setWhichTask();
}

/**
 * Created by sawye on 11/21/2016.
 */
