//Simple Display with a refresh button and a display of balances in the account

import React, { useContext } from "react";

import TransactionEndpoint from "../Endpoint/TransactionEndpoint";
import SummaryEndpoint from "../Endpoint/SummaryEndpoint";
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

const SpendingSummary = () => {
    const { products, isCraProductsExclusively } = useContext(Context);
    return (
        <>
        <ProductTypesContainer productType="Spending Summary">
            {products.includes("transactions") && (
                <TransactionEndpoint
                endpoint="transactions"
                name="Transactions"
                categories={transactionsCategories}
                schema="/transactions/sync/"
                description="Retrieve transactions or incremental updates for credit and depository accounts."
                transformData={transformTransactionsData}
                />
            )}
        </ProductTypesContainer>
        <ProductTypesContainer productType="Categories">
        <SummaryEndpoint
            endpoint="transactionsDB"
            name="TransactionsDB"
            categories={transactionsCategories}
            schema="/transactionsDB"
            description="Retrieve transactions or incremental updates for credit and depository accounts."
            transformData={transformTransactionsData}
        />
        </ProductTypesContainer>
        </>
    )
}

export default SpendingSummary