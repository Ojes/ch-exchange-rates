import styled from "styled-components";
import { orderStates } from "../config/settings";
import { OPERATION_TYPE } from "../constants";
import { geOrderStateNameById } from "../helpers";

const OrderItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const OperationWrapper = styled.span`
  color: ${({ isBuy }) => (isBuy ? "rgb(246 70 93)" : "rgb(14, 203, 129)")};
  font-size: 13px;
  font-weight: bold;
  margin-left: 4px;
`;

const AssetWrapper = styled.span`
  color: #ffffff;
  font-weight: bold;
`;

const RowWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 40px;
  justify-content: space-between;
  margin: 8px;
`;

const RowLabelWrapper = styled.div`
  color: rgb(132, 142, 156);
`;

const RowValueWrapper = styled.div`
  color: #ffffff;
`;

const TagWrapper = styled.div`
  background-color: rgba(43, 47, 54, 0.9);
  border-radius: 4px;
  box-sizing: border-box;
  color: white;
  height: fit-content;
  padding: 4px 10px;
`;

export function OrderItem({
  orderState,
  operationType,
  orderType,
  amount,
  total,
  date,
  from,
  to,
}) {
  const totalFormatted = (+total).toLocaleString("es-AR", {
    maximumFractionDigits: 2,
  });

  const dateFormatted = new Date(date).toLocaleString("es-AR", {
    dateStyle: "short",
  });

  const amountFormatted = (+amount).toFixed(5);
  return (
    <OrderItemWrapper>
      <RowWrapper>
        <div>
          <AssetWrapper>
            {from} / {to}
          </AssetWrapper>
          <OperationWrapper isBuy={operationType.id === OPERATION_TYPE.BUY}>
            {operationType.name}/{orderType.name}
          </OperationWrapper>
        </div>
        <TagWrapper>{geOrderStateNameById(orderState)}</TagWrapper>
      </RowWrapper>
      <RowWrapper>
        <RowLabelWrapper>Amount</RowLabelWrapper>
        <RowValueWrapper>{amountFormatted}</RowValueWrapper>
      </RowWrapper>
      <RowWrapper>
        <RowLabelWrapper>Total</RowLabelWrapper>
        <RowValueWrapper>{totalFormatted}</RowValueWrapper>
      </RowWrapper>
      <RowWrapper>
        <RowLabelWrapper>Fecha</RowLabelWrapper>
        <RowValueWrapper>{dateFormatted}</RowValueWrapper>
      </RowWrapper>
    </OrderItemWrapper>
  );
}
