import { OrderItem } from "./OrderItem";

export function OrderList({ source }) {
  const children = source.map((item) => <OrderItem key={item.id} {...item} />);
  return <>{children}</>;
}
