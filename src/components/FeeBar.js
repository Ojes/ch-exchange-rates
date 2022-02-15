import { useFee } from "../hooks/useFee";

export function FeeBar() {
  const fee = useFee();
  return (
    <section>
      <p>{fee}%</p>
    </section>
  );
}
