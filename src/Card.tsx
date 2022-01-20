export type CardItem = {
  id: number;
  value: string;
  state: "isOpen" | "isClose" | "isCorrect";
};

export const Card: React.VFC<{
  className?: string;
  item: CardItem;
  onOpenCard: (item: CardItem) => void;
}> = ({ className, item, onOpenCard }) => {
  const handleClick = () => {
    if (!(item.state === "isClose")) {
      return;
    }
    onOpenCard(item);
  };

  return (
    <div
      className={`w-36 h-52 relative ${
        item.state === "isOpen"
          ? "bg-stone-100"
          : item.state === "isClose"
          ? "bg-orange-400"
          : item.state === "isCorrect"
          ? "bg-stone-300"
          : ""
      } rounded-lg flex justify-center items-center text-6xl font-bold ${className}`}
      onClick={handleClick}
    >
      {!(item.state === "isClose") ? item.value : ""}
      {item.state === "isCorrect" ? (
        <p className="text-yellow-400 absolute text-9xl">◯</p>
      ) : null}
    </div>
  );
};
