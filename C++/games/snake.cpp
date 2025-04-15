#include <iostream>
#include <unistd.h>
#include <termios.h>
#include <cstdlib>
#include <ctime>
#include <ncurses.h>

using namespace std;

bool gameOver;
const int width = 20;
const int height = 20;
int x, y, fruitX, fruitY, score;
int tailX[100], tailY[100]; // 1st tail could be at spot (1,3): tailX[0] = 1, tailY[0] = 3
int nTail;
int maxScore = 25;
enum eDirection
{
    STOP = 0,
    LEFT,
    RIGHT,
    UP,
    DOWN
};
eDirection dir;

void respawnFruit()
{
    fruitX = 1 + rand() % (width - 2);
    fruitY = 1 + rand() % (height - 2);
}

void Setup()
{
    initscr();             // Initialize ncurses
    clear();               // Clear the screen
    noecho();              // Disable echoing of characters
    curs_set(0);           // Hide cursor
    keypad(stdscr, TRUE);  // Enable keypad input
    nodelay(stdscr, TRUE); // Enable non-blocking input
    gameOver = false;
    dir = STOP;
    x = width / 2;
    y = height / 2;
    srand(time(NULL));
    respawnFruit();
    score = 0;
}

void Draw()
{
    clear();

    for (int i = 0; i < width + 2; i++)
        mvprintw(0, i, "#");
    for (int j = 1; j < height + 1; j++)
    {
        mvprintw(j, 0, "#");
        for (int i = 1; i < width + 1; i++)
        {
            if (j == y && i == x)
                printw("O");
            else if (j == fruitY && i == fruitX)
                printw("F");
            else
            {
                bool tail = false;
                for (int k = 0; k < nTail; k++)
                {
                    if (tailX[k] == i && tailY[k] == j)
                    {
                        printw("o");
                        tail = true;
                    }
                }
                if (!tail)
                    printw(" ");
            }
        }
        mvprintw(j, width + 1, "#");
    }
    for (int i = 0; i < width + 2; i++)
        mvprintw(height + 1, i, "#");
    mvprintw(height + 3, 0, "Score: %d", score);
    for (int i = 0; i < nTail; i++)
    {
        mvprintw(height + 5 + i, 0, "Tail[%d]: (%d, %d)", i, tailX[i], tailY[i]);
    }
    refresh();
}

void Input()
{
    int key = getch();
    if (key != ERR)
    {
        switch (key)
        {
        case KEY_LEFT:
        case 'a':
            dir = LEFT;
            break;
        case KEY_RIGHT:
        case 'd':
            dir = RIGHT;
            break;
        case KEY_UP:
        case 'w':
            dir = UP;
            break;
        case KEY_DOWN:
        case 's':
            dir = DOWN;
            break;
        case 'x':
            gameOver = true;
            break;
        }
    }
}

void Logic()
{
    int prevX = tailX[0];
    int prevY = tailY[0];
    tailX[0] = x;
    tailY[0] = y;
    int prev2X, prev2Y;
    for (int i = 1; i < nTail; i++)
    {
        prev2X = tailX[i];
        prev2Y = tailY[i];
        tailX[i] = prevX;
        tailY[i] = prevY;
        prevX = prev2X;
        prevY = prev2Y;
    }

    switch (dir)
    {
    case LEFT:
        x--;
        break;
    case RIGHT:
        x++;
        break;
    case UP:
        y--;
        break;
    case DOWN:
        y++;
        break;
    default:
        break;
    }
    // // hit wall -> game over
    // if (x > width || x < 1 || y > height || y < 1)
    // {
    //     gameOver = true;
    // }
    // goes cross map
    if (x >= width)
        x = 0;
    else if (x < 0)
        x = width - 1;
    if (y >= height)
        y = 0;
    else if (y <= 0)
        y = height - 1;

    for (int i = 0; i < nTail; i++)
    {
        if ((tailX[i] == x && tailY[i] == y) || score == maxScore)
        {
            gameOver = true;
        }
    }
    if (x == fruitX && y == fruitY)
    {
        score++;
        nTail++;
        respawnFruit();
    }
}

void winOrLose()
{
    if (score == maxScore)
    {
        cout << "You beat the game by scoring " << score << "points!" << endl;
    }
    else
    {
        cout << "You SUCK LOSER!!! Try again..." << endl;
        cout << "You scored: " << score << endl;
    }
}

int main()
{
    Setup();

    while (!gameOver)
    {
        Draw();
        Input();
        Logic();
        usleep(200000); // Adjust game speed
    }

    endwin();

    winOrLose();

    return 0;
}