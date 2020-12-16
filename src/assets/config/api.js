const RootUrl = 'http://lptest.gateway.qingxu.website:20086/'

module.exports = {
    //user related
    login: RootUrl + "user/login",
    getMessage: RootUrl + "user/getMessageListByTitle",
    changePassword: RootUrl + "user/changePassword",

    //member related
    memberGetCompanyInfo: RootUrl + "company/getCompanyInfo",
    companyGetHistoryByStatus: RootUrl + "company/getLoanListByStatus",
    companyGetLoanInfo: RootUrl + "company/getLoanById",
    companyCreatecompany: RootUrl + "company/createCompany",
    companyGetHistoryByStatusNum: RootUrl + "company/getLoanListByStatusNum",
    companybuyproduct: RootUrl + "company/buyProduct",
    companyGetProductList: RootUrl + "company/getProductList",
    companyGetProductListNum: RootUrl + "company/getProductListNum",
    companyGetProductById: RootUrl + "company/getProductById",
    companyGetBuyProductList: RootUrl + "company/getBuyProductList",
    companyGetBuyProductNum: RootUrl + "company/getBuyProductListNum",
    

    
    //admin related
    adminGetCompanyList: RootUrl + "admin/getCompanyListByStatusAndName",
    adminGetCompanyInfo: RootUrl + "admin/getCompanyInfoById",
    adminApproveCompany: RootUrl + "admin/passCompany",
    adminRejectCompany: RootUrl + "admin/deleteCompany",
    adminGetLoanListByStatus: RootUrl + "admin/getLoanListByStatus",
    adminGetLoanListByStatusNum: RootUrl + "admin/getLoanListByStatusNum",
    adminGetLoanListByCompanyId: RootUrl + "admin/getLoanListByCompanyId",
    adminGetLoanListByCompanyIdNum: RootUrl + "admin/getLoanListByCompanyIdNum",
    adminGetLoanInfo: RootUrl + "admin/getLoanInfoByLoanId",
    adminApproveLoan: RootUrl + "admin/passLoan",
    adminRejectLoan: RootUrl + "admin/refuseLoan",
    adminGetCompanyListNum: RootUrl + "admin/getCompanyListNum",
    
    
    companycreateLoan: RootUrl + "company/createLoan",
    companyChangeCompanyInfo: RootUrl + "company/changeCompanyInfo",
    userRegister: RootUrl + "user/register",
}