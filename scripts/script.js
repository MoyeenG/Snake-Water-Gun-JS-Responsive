//landing page element objects:

const start_game_button = document.getElementById("start_game");

const quit_game_before_starting = document.getElementById("quit_game");






// gameplay / results modal element objects:

const gameplay_modal = document.getElementById("gameplay_results_modal");

const current_winner_info = document.getElementById("current_Winner");

const player_current_guess = document.getElementById("player_current_guess")
    .getElementsByTagName("span")[0];

const computer_current_guess = document.getElementById("computer_current_guess")
    .getElementsByTagName("span")[0];

const player_score_element = document.getElementById("player_current_score")
    .getElementsByTagName("span")[0];

const computer_score_element = document.getElementById("computer_current_score")
    .getElementsByTagName("span")[0];

const player_input_box = document.getElementById("input_Box");

const player_input_button = document.getElementById("player_Input_Button");

const attempts_remaining = document.getElementById("attempts_Remaining")
    .getElementsByTagName("span")[0];

const close_icon_gameplay = document.getElementById("close_modal_icon_gameplay");

const gameplay_quit_button = document.getElementById("gameplay_quit_button");

const game_over_exit_button = document.getElementById("game_over_exit_button");







// quit game modal element objects:

const close_icon_quit_confirm = document.getElementById("close_modal_icon_quit_game");

const quit_game_modal = document.getElementById("quit_game_modal");

const modal_confirm_quit_button = document.getElementById("modal_quit_button");

const modal_cancel_quit_button = document.getElementById("modal_cancelQuit_button");





const guess_options = ["s", "w", "g"];      //input options array

let random_index = 0;           //random index of input options array for picking random computer input

let player_input = "";          //value entered by player in the input box

let computer_input = "";        //random element picked from input array s computer's input

let player_current_score = 0;           //for keeping track of player score during play

let computer_current_score = 0;         //for keeping track of computer score during play

let try_count = 9;         //max attempts allowed. Keeps on decreasing by 1 for each attempt

let game_finished = false;       /* for checking if the play has been terminated mid game by the player
or all 10 attempts have been exhausted. */






const handleResults = function () {
    if (game_finished === true) {
        current_winner_info.innerText = player_current_score > computer_current_score ? "Player Wins" : "Computer Wins";
        current_winner_info.style.fontSize = "50px";
    }

    else {
        quit_game_modal.style.display = "none";
        gameplay_modal.style.display = "block";
        current_winner_info.innerText = "No winner. Player quit the game"
        current_winner_info.style.fontSize = "35px";
        current_winner_info.style.textAlign = "center";
    }

    document.getElementById("input_elem_container").style.display = "none";


    close_icon_gameplay.style.display = "none";
    gameplay_quit_button.style.display = "none";

    game_over_exit_button.style.display = "block";

    current_winner_info.style.marginBlock = "40px";
    current_winner_info.style.color = "var(--background_color_left)";

    const stats_list = document.getElementById("game_stats_container").getElementsByTagName("ul")[0];

    stats_list.removeChild(stats_list.children[0]);
    stats_list.removeChild(stats_list.children[1]);
};



const gameplayHandler = function () {
    player_input = player_input_box.value.toLowerCase().trim();
    player_input_box.value = "";

    random_index = Math.floor(Math.random() * 3);

    computer_input = guess_options[random_index];

    if (player_input === "s" || player_input === "w" || player_input === "g") {
        switch (player_input) {
            case "s":
                switch (computer_input) {
                    case "s":
                        current_winner_info.innerText = '"Matching input. Scores unchanged"';
                        break;

                    case "w":
                        current_winner_info.innerText = '"...Player scores..."';
                        player_current_score++;
                        break;

                    default:
                        current_winner_info.innerText = '"...Computer scores..."';
                        computer_current_score++;
                }
                break;

            case "w":
                switch (computer_input) {
                    case "s":
                        current_winner_info.innerText = '"...Computer scores..."';
                        computer_current_score++;
                        break;

                    case "w":
                        current_winner_info.innerText = '"Matching input. Scores unchanged"';
                        break;

                    default:
                        current_winner_info.innerText = '"...Player scores..."';
                        player_current_score++;

                }
                break;

            default:
                switch (computer_input) {
                    case "s":
                        current_winner_info.innerText = '"...Player scores..."';
                        player_current_score++;
                        break;

                    case "w":
                        current_winner_info.innerText = '"...Computer scores..."';
                        computer_current_score++;
                        break;

                    default:
                        current_winner_info.innerText = '"Matching input. Scores unchanged"';
                }
        }

        try_count++;

        player_current_guess.innerText = player_input;
        player_score_element.innerText = player_current_score;

        computer_current_guess.innerText = computer_input;
        computer_score_element.innerText = computer_current_score;

        attempts_remaining.innerText = 10 - try_count + " ";
    }

    else {
        alert("Wrong Input. Try again");
    }

    if (try_count === 10) {
        game_finished = true;
        handleResults();
    }

};




//event handlers...............

quit_game_before_starting.addEventListener("click", () => {
    document.write("You have exited the game. Reload page for starting again");
});




start_game_button.addEventListener("click", () => { gameplay_modal.style.display = "block"; });

player_input_button.addEventListener("click", gameplayHandler);




close_icon_gameplay.addEventListener("click", () => {
    quit_game_modal.style.display = "block";
    gameplay_modal.style.display = "none";
});

gameplay_quit_button.addEventListener("click", () => {
    quit_game_modal.style.display = "block";
    gameplay_modal.style.display = "none";
});




close_icon_quit_confirm.addEventListener("click", () => {
    console.log("quit game callback");
    quit_game_modal.style.display = "none";
    gameplay_modal.style.display = "block";
});

modal_cancel_quit_button.addEventListener("click", () => {
    quit_game_modal.style.display = "none";
    gameplay_modal.style.display = "block";
});





modal_confirm_quit_button.addEventListener("click", handleResults);     //play terminated mid game


game_over_exit_button.addEventListener("click", () => { location.reload(); });