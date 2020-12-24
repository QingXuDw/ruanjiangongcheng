const RootUrl = 'http://lp.gateway.qingxu.website:20086/'

module.exports = {
    //user related
    login: RootUrl + "user/login",
    getMessage: RootUrl + "user/messageListByTitle",
    changePassword: RootUrl + "user/password",
    userRegister: RootUrl + "user/register",

    //member related
    memberGetCompanyInfo: RootUrl + "company/companyInfo",
    companyGetHistoryByStatus: RootUrl + "company/loanListByStatus",
    companyGetLoanInfo: RootUrl + "company/loanById",
    companyCreatecompany: RootUrl + "company/company",
    companyGetHistoryByStatusNum: RootUrl + "company/loanListByStatusNum",
    companycreateLoan: RootUrl + "company/loan",
    companyChangeCompanyInfo: RootUrl + "company/companyInfo",
    

    
    //admin related
    adminGetCompanyList: RootUrl + "admin/companyListByStatusAndName",
    adminGetCompanyInfo: RootUrl + "admin/companyInfoById",
    adminApproveCompany: RootUrl + "admin/companyPass",
    adminRejectCompany: RootUrl + "admin/companyFailure",
    adminGetLoanListByStatus: RootUrl + "admin/loanListByStatus",
    adminGetLoanListByStatusNum: RootUrl + "admin/loanListByStatusNum",
    adminGetLoanListByCompanyId: RootUrl + "admin/loanListByCompanyId",
    adminGetLoanListByCompanyIdNum: RootUrl + "admin/loanListByCompanyIdNum",
    adminGetLoanInfo: RootUrl + "admin/loanInfoByLoanId",
    adminApproveLoan: RootUrl + "admin/loanPass",
    adminRejectLoan: RootUrl + "admin/loanFailure",
    adminGetCompanyListNum: RootUrl + "admin/companyListNum",
    adminGetInvestmentList: RootUrl + "admin/productList",
    adminGetInvestmentListNum: RootUrl + "admin/productListNum",
    adminGetInvestmentInfo: RootUrl + "admin/productById",
    adminCreateProduct: RootUrl + "admin/product",
    adminChangeProduct: RootUrl + "admin/productById",
    adminRateCompany: RootUrl + "admin/companyScore",
}

