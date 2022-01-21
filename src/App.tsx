import { useReducer, useRef } from "react";
import { Board } from "./Board";
import { Card, CardItem } from "./Card";
import { shuffle } from "./shuffle";
import { getCardValues } from "./values";

type State = CardItem[];

type Action =
  | { type: "reset" }
  | { type: "open"; id: number }
  | { type: "correct" }
  | { type: "close" };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "open": {
      return state.map((card): CardItem => {
        if (card.id === action.id) {
          return { ...card, state: "isOpen" };
        }
        return card;
      });
    }
    case "close": {
      return state.map((card): CardItem => {
        if (card.state === "isOpen") {
          return { ...card, state: "isClose" };
        }
        return card;
      });
    }
    case "correct": {
      return state.map((card): CardItem => {
        if (card.state === "isOpen") {
          return { ...card, state: "isCorrect" };
        }
        return card;
      });
    }
    case "reset": {
      return buildCards(state.length);
    }
  }
};

const buildCards = (num: number) => {
  if (num % 2 !== 0) {
    throw new Error("カードの数は偶数である必要があります。");
  }

  const values = getCardValues(5);
  return shuffle([...values, ...values]).map((value, i): CardItem => {
    return { id: i, value, state: "isClose" };
  });
};

function App() {
  const waiting = useRef(false);
  const [cardItems, dispatch] = useReducer(reducer, buildCards(10));

  const openCard = cardItems.find((item) => item.state === "isOpen");
  const isClear = cardItems.every((card) => card.state === "isCorrect");

  const handleOpenCard = ({ id, value }: CardItem) => {
    // 待機中は操作を受け付けない
    if (waiting.current) {
      return;
    }

    dispatch({ type: "open", id });

    if (openCard) {
      if (openCard.value === value) {
        dispatch({ type: "correct" });
      } else {
        waiting.current = true;
        setTimeout(() => {
          dispatch({ type: "close" });
          waiting.current = false;
        }, 500);
      }
    }
  };

  const handleClickReset = () => {
    dispatch({ type: "reset" });
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-800">
      <p
        className={`text-stone-100 text-6xl font-bold text-center ${
          !isClear && "invisible"
        } `}
      >
        Clear!!!
      </p>

      <Board className="m-auto mt-5 ">
        {cardItems.map((item) => (
          <Card
            key={item.id}
            className="m-3"
            item={item}
            onOpenCard={handleOpenCard}
          />
        ))}
      </Board>
      <button
        className="m-auto mt-5 text-slate-50 px-4 py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-3xl block font-bold"
        onClick={handleClickReset}
      >
        リセット
      </button>
    </div>
  );
}

export default App;
