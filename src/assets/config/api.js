const RootUrl = 'http://lp.gateway.qingxu.website:20086/'

module.exports = {
    //user related
    login: RootUrl + "user/login",
    getMessage: RootUrl + "user/getMessageListByTitle",

    //member related
    memberGetCompanyInfo: RootUrl + "company/getCompanyInfo",
    
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
    
    
}