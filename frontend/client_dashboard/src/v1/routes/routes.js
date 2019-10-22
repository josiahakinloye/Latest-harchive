import { useroverviewurl, usertransferassetsurl, usermanagebeneficiariessurl, userfriendsurl, usersettingsurl } from ",../../../_helpers/constants";

export const routes = {
    overview: useroverviewurl,
    transfer_assets: usertransferassetsurl,
    manage_beneficiaries: usermanagebeneficiariessurl,
    friends: userfriendsurl,
    settings: usersettingsurl
}

export const routesTitles = {
    overview: "Overview",
    transfer_assets: "Transfer Asset",
    manage_beneficiaries: "Manage Beneficiaries",
    friends: "Friends",
    settings: "Settings"
}

export const routesIcons = {
    overview: "account_balance",
    transfer_assets: "assignment_return",
    manage_beneficiaries: "swap_calls",
    friends: " people_outline",
    settings: "settings"
}