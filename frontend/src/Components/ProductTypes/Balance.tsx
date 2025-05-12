//Simple Display with a refresh button and a display of balances in the account

import React, { useContext } from "react";

import Endpoint from "../Endpoint";
import Context from "../../Context";
import ProductTypesContainer from "./ProductTypesContainer";
import {
  transactionsCategories,
  authCategories,
  identityCategories,
  balanceCategories,
  investmentsCategories,
  investmentsTransactionsCategories,
  liabilitiesCategories,
  paymentCategories,
  assetsCategories,
  incomePaystubsCategories,
  transferCategories,
  transferAuthorizationCategories,
  signalCategories,
  statementsCategories,
  transformAuthData,
  transformTransactionsData,
  transformBalanceData,
  transformInvestmentsData,
  transformInvestmentTransactionsData,
  transformLiabilitiesData,
  transformIdentityData,
  transformPaymentData,
  transformAssetsData,
  transformTransferData,
  transformTransferAuthorizationData,
  transformIncomePaystubsData,
  transformSignalData,
  transformStatementsData,
  transformBaseReportGetData,
  transformIncomeInsightsData,
  checkReportBaseReportCategories,
  checkReportInsightsCategories,
  transformPartnerInsightsData,
  checkReportPartnerInsightsCategories
} from "../../dataUtilities";

const Balance = () => {
    const { products, isCraProductsExclusively } = useContext(Context);
    return (
        <ProductTypesContainer productType="Balances">
            {!products.includes("payment_initiation") && !isCraProductsExclusively && (
            <Endpoint
                endpoint="balance"
                name="Balance"
                categories={balanceCategories}
                schema="/accounts/balance/get/"
                description="Check balances in real time to prevent non-sufficient funds
            fees."
                transformData={transformBalanceData}
            />
        )}
        </ProductTypesContainer>
    )
}

export default Balance