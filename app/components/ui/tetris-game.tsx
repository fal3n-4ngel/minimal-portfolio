"use client";
import React, { useState, useEffect, useCallback } from "react";

// Types
type PieceColor = string;
type PieceShape = number[][];
type Board = (PieceColor | 0)[][];
type Position = { x: number; y: number };

interface Piece {
  shape: PieceShape;
  color: PieceColor;
}

type PieceKey = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

const TetrisGame: React.FC = () => {
  // Constants
  const BOARD_WIDTH = 10;
  const BOARD_HEIGHT = 20;
  const CELL_SIZE = 20;

  // Tetris pieces configuration
  const PIECES: Record<PieceKey, Piece> = {
    I: {
      shape: [[1, 1, 1, 1]],
      color: "#00f5ff",
    },
    O: {
      shape: [
        [1, 1],
        [1, 1],
      ],
      color: "#ffed00",
    },
    T: {
      shape: [
        [0, 1, 0],
        [1, 1, 1],
      ],
      color: "#a000f0",
    },
    S: {
      shape: [
        [0, 1, 1],
        [1, 1, 0],
      ],
      color: "#00f000",
    },
    Z: {
      shape: [
        [1, 1, 0],
        [0, 1, 1],
      ],
      color: "#f00000",
    },
    J: {
      shape: [
        [1, 0, 0],
        [1, 1, 1],
      ],
      color: "#0000f0",
    },
    L: {
      shape: [
        [0, 0, 1],
        [1, 1, 1],
      ],
      color: "#ff7f00",
    },
  };

  // State
  const [board, setBoard] = useState<Board>(() =>
    Array(BOARD_HEIGHT)
      .fill(null)
      .map(() => Array(BOARD_WIDTH).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [nextPiece, setNextPiece] = useState<Piece | null>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [score, setScore] = useState<number>(0);
  const [lines, setLines] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Utility functions
  const getRandomPiece = useCallback((): Piece => {
    const pieces = Object.keys(PIECES) as PieceKey[];
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    return PIECES[randomPiece];
  }, []);

  const rotatePiece = useCallback((piece: PieceShape): PieceShape => {
    return piece[0].map((_, index) => piece.map((row) => row[index]).reverse());
  }, []);

  const isValidMove = useCallback(
    (
      piece: PieceShape,
      newX: number,
      newY: number,
      testBoard: Board = board
    ): boolean => {
      for (let y = 0; y < piece.length; y++) {
        for (let x = 0; x < piece[y].length; x++) {
          if (piece[y][x]) {
            const boardX = newX + x;
            const boardY = newY + y;

            if (
              boardX < 0 ||
              boardX >= BOARD_WIDTH ||
              boardY >= BOARD_HEIGHT ||
              (boardY >= 0 && testBoard[boardY][boardX])
            ) {
              return false;
            }
          }
        }
      }
      return true;
    },
    [board, BOARD_WIDTH, BOARD_HEIGHT]
  );

  // Game initialization
  const initializeGame = useCallback(() => {
    const newBoard = Array(BOARD_HEIGHT)
      .fill(null)
      .map(() => Array(BOARD_WIDTH).fill(0));
    const firstPiece = getRandomPiece();
    const secondPiece = getRandomPiece();

    setBoard(newBoard);
    setCurrentPiece(firstPiece);
    setNextPiece(secondPiece);
    setPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 });
    setScore(0);
    setLines(0);
    setGameOver(false);
    setGameStarted(true);
    setIsPaused(false);
  }, [getRandomPiece, BOARD_WIDTH, BOARD_HEIGHT]);

  // Place piece on board
  const placePiece = useCallback(() => {
    if (!currentPiece || !nextPiece) return;

    const newBoard = board.map((row) => [...row]);

    // Place current piece
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = position.y + y;
          const boardX = position.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = currentPiece.color;
          }
        }
      }
    }

    // Check for completed lines
    let linesCleared = 0;
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (newBoard[y].every((cell) => cell !== 0)) {
        newBoard.splice(y, 1);
        newBoard.unshift(Array(BOARD_WIDTH).fill(0));
        linesCleared++;
        y++; // Check the same line again
      }
    }

    // Update score and lines
    if (linesCleared > 0) {
      setLines((prev) => prev + linesCleared);
      setScore((prev) => prev + linesCleared * 100 * linesCleared);
    }

    setBoard(newBoard);
    setCurrentPiece(nextPiece);
    setNextPiece(getRandomPiece());
    setPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 });

    // Check game over
    if (
      !isValidMove(
        nextPiece.shape,
        Math.floor(BOARD_WIDTH / 2) - 1,
        0,
        newBoard
      )
    ) {
      setGameOver(true);
      setGameStarted(false);
    }
  }, [
    currentPiece,
    nextPiece,
    board,
    position,
    BOARD_HEIGHT,
    BOARD_WIDTH,
    getRandomPiece,
    isValidMove,
  ]);

  // Move piece
  const movePiece = useCallback(
    (dx: number, dy: number) => {
      if (!currentPiece || gameOver || isPaused) return;

      const newX = position.x + dx;
      const newY = position.y + dy;

      if (isValidMove(currentPiece.shape, newX, newY)) {
        setPosition({ x: newX, y: newY });
      } else if (dy > 0) {
        // Piece hit bottom, place it
        placePiece();
      }
    },
    [currentPiece, gameOver, isPaused, position, isValidMove, placePiece]
  );

  // Rotate current piece
  const rotateCurrent = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    const rotated = rotatePiece(currentPiece.shape);
    if (isValidMove(rotated, position.x, position.y)) {
      setCurrentPiece((prev) => (prev ? { ...prev, shape: rotated } : prev));
    }
  }, [currentPiece, gameOver, isPaused, rotatePiece, isValidMove, position]);

  // Drop piece instantly
  const dropPiece = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    let newY = position.y;
    while (isValidMove(currentPiece.shape, position.x, newY + 1)) {
      newY++;
    }
    setPosition((prev) => ({ ...prev, y: newY }));
    // Use setTimeout to ensure position is updated before placing
    setTimeout(placePiece, 0);
  }, [currentPiece, gameOver, isPaused, position, isValidMove, placePiece]);

  // Game loop effect
  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return;

    const interval = setInterval(() => {
      movePiece(0, 1);
    }, Math.max(100, 1000 - lines * 50));

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, isPaused, lines, movePiece]);

  // Keyboard controls effect
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          movePiece(-1, 0);
          break;
        case "ArrowRight":
          e.preventDefault();
          movePiece(1, 0);
          break;
        case "ArrowDown":
          e.preventDefault();
          movePiece(0, 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          rotateCurrent();
          break;
        case " ":
          e.preventDefault();
          dropPiece();
          break;
        case "p":
        case "P":
          e.preventDefault();
          setIsPaused((prev) => !prev);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStarted, gameOver, movePiece, rotateCurrent, dropPiece]);

  // Render functions
  const renderBoard = useCallback((): Board => {
    const displayBoard = board.map((row) => [...row]);

    // Add current piece to display board
    if (currentPiece && gameStarted && !gameOver) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = position.y + y;
            const boardX = position.x + x;
            if (
              boardY >= 0 &&
              boardY < BOARD_HEIGHT &&
              boardX >= 0 &&
              boardX < BOARD_WIDTH
            ) {
              displayBoard[boardY][boardX] = currentPiece.color;
            }
          }
        }
      }
    }

    return displayBoard;
  }, [
    board,
    currentPiece,
    gameStarted,
    gameOver,
    position,
    BOARD_HEIGHT,
    BOARD_WIDTH,
  ]);

  const renderNextPiece = useCallback(() => {
    if (!nextPiece) return null;

    return (
      <div className="border border-gray-300 p-1 bg-gray-50">
        <div className="font-bold text-xs mb-1">NEXT</div>
        <div className="w-8 h-8 mx-auto relative bg-black border border-gray-400">
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "12px",
              height: "12px",
              backgroundColor: nextPiece.color,
            }}
          />
        </div>
      </div>
    );
  }, [nextPiece]);

  return (
    <div className="bg-white  font-mono h-full flex flex-col">
      <div className="border-b border-gray-300 p-2 bg-gray-50 text-sm flex justify-between items-center">
        <div className="font-bold">tetris</div>
        <div className="text-xs text-gray-600">
          {gameStarted && !gameOver
            ? isPaused
              ? "paused"
              : "playing"
            : "stopped"}
        </div>
      </div>

      <div className="flex-1 p-2 flex gap-3">
        {/* Game Board */}
        <div className="flex-1 flex flex-col justify-center">
          <div
            className="border border-gray-400 mx-auto bg-black relative"
            style={{
              width: `${BOARD_WIDTH * (CELL_SIZE * 0.8)}px`,
              height: `${BOARD_HEIGHT * (CELL_SIZE * 0.8)}px`,
            }}
          >
            {/* Board Grid */}
            <div
              className="absolute inset-0"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
                gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1fr)`,
                gap: "1px",
              }}
            >
              {renderBoard()
                .flat()
                .map((cell, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: cell || "#111",
                      border: cell ? "none" : "1px solid #333",
                    }}
                  />
                ))}
            </div>

            {/* Game Over Overlay */}
            {gameOver && (
              <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center">
                <div className="text-white text-center text-xs">
                  <div className="font-bold mb-1">GAME OVER</div>
                  <div>Score: {score}</div>
                </div>
              </div>
            )}

            {/* Pause Overlay */}
            {isPaused && gameStarted && (
              <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center">
                <div className="text-white text-xs font-bold">PAUSED</div>
              </div>
            )}
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-28 space-y-2 text-xs">
          {/* Score & Lines */}
          <div className="border border-gray-300 p-1 bg-gray-50">
            <div className="w-full flex justify-around items-center mb-1">
              <div className="font-bold text-xs ">SCORE: </div>
              <div className="text-sm font-mono">{score}</div>
            </div>
             <div className="w-full flex justify-around items-center my-1">
            <div className="font-bold text-xs ">LINES:</div>
            <div className="text-sm font-mono">{lines}</div>
            </div>
          </div>

          {/* Next Piece */}
          {renderNextPiece()}

          {/* Controls */}
          <div className="border border-gray-300 p-1 bg-gray-50">
            <div className="font-bold text-xs mb-1">KEYS</div>
            <div className="text-xs space-y-2 leading-relaxed gap-4">
              <div>↑ ↓ ← →</div>
              <div>space - hard drop</div>
              <div>p - pause</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-1">
            <button
              onClick={initializeGame}
              className="w-full text-xs border border-gray-300 px-1 py-1 hover:bg-gray-100 font-bold"
            >
              {gameStarted ? "NEW" : "START"}
            </button>

            {gameStarted && !gameOver && (
              <button
                onClick={() => setIsPaused((prev) => !prev)}
                className="w-full text-xs border border-gray-300 px-1 py-1 hover:bg-gray-100"
              >
                {isPaused ? "▶" : "⏸"}
              </button>
            )}
          </div>
        </div>
      </div>

      {!gameStarted && !gameOver && (
        <div className="text-center p-2 text-gray-500 text-xs">
          press start to play
        </div>
      )}
    </div>
  );
};

export default TetrisGame;
