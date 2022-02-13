import styled from "styled-components";
import { OPERATION_TYPE } from "../constants";
import { getOperationNameById, getOrderNameById } from "../helpers";

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
  font-size: 12px;
  height: 40px;
  justify-content: space-between;
  margin: 3px;
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
  operationType,
  orderType,
  amount,
  price,
  date,
  from,
  to,
}) {
  const priceFormatted = (+price).toLocaleString("es-AR", {
    maximumFractionDigits: 2,
  });

  const dateFormatted = new Date(date).toISOString();

  const amountFormatted = (+amount).toFixed(5);
  return (
    <OrderItemWrapper>
      <RowWrapper>
        <div>
          <AssetWrapper>
            {from} / {to}
          </AssetWrapper>
          <OperationWrapper isBuy={operationType === OPERATION_TYPE.BUY}>
            {getOperationNameById(operationType)}/{getOrderNameById(orderType)}
          </OperationWrapper>
        </div>
        <TagWrapper>Filled</TagWrapper>
      </RowWrapper>
      <RowWrapper>
        <RowLabelWrapper>Amount</RowLabelWrapper>
        <RowValueWrapper>{amountFormatted}</RowValueWrapper>
      </RowWrapper>
      <RowWrapper>
        <RowLabelWrapper>Price</RowLabelWrapper>
        <RowValueWrapper>{priceFormatted}</RowValueWrapper>
      </RowWrapper>
      <RowWrapper>
        <RowLabelWrapper>Fecha</RowLabelWrapper>
        <RowValueWrapper>{dateFormatted}</RowValueWrapper>
      </RowWrapper>
    </OrderItemWrapper>
  );
}
