export interface RunWorkshopBuyOption {
  amount: string;
  cost: number;
  disabled?: boolean;
}

export interface RunWorkshopItem {
  id: string;
  title: string;
  iconName?: string;
  level?: number;
  before: number;
  after?: number;
  beforeSuffix?: string;
  options: RunWorkshopBuyOption[];
}

export interface RunWorkshopBottomSheetProps {
  items: RunWorkshopItem[];
  screws: number;
  onBuy?: (itemId: string, amount: string) => void;
  onClose?: () => void;
  onHandlePointerDown?: (e: React.PointerEvent) => void;
  handleDragging?: boolean;
}

export declare function RunWorkshopBottomSheet(props: RunWorkshopBottomSheetProps): JSX.Element;
