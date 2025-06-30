import { Minus, Plus } from "lucide-react";
import { FC } from "react";

type QuantityControlProps = {
  quantity: number;
  canIncrease?: boolean;
  onIncrease?: () => void;
  onDecrease?: () => void;
};

const QuantityControl: FC<QuantityControlProps> = ({
  quantity = 0,
  canIncrease = true,
  onIncrease,
  onDecrease,
}: QuantityControlProps) => {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => (quantity > 0 && onDecrease ? onDecrease() : {})}
        className="p-2 bg-gray-100 rounded-md"
      >
        <Minus size={16} />
      </button>
      <span className="font-bold">{quantity}</span>
      <button
        type="button"
        onClick={() => (canIncrease && onIncrease ? onIncrease() : {})}
        className="p-2 bg-gray-100 rounded-md"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default QuantityControl;
