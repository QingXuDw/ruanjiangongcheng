const RootUrl = 'http://lp.backend.qingxu.website:20086/'

module.exports = {
    login: RootUrl + "user/login",
    memberGetCompanyInfo: RootUrl + "company/getCompanyInfo",
    adminGetCompanyList: RootUrl + "admin/getCompanyListByName",
    adminGetCompanyInfo: RootUrl + "admin/getCompanyInfoById",
    adminApproveCompany: RootUrl + "admin/passCompany",
    adminRejectCompany: RootUrl + "admin/deleteCompany",
}