# Show User Info

A sample application to explore methods for retrieving user information in UI5 applications deployed on SAP BTP.

## Overview

This project demonstrates two approaches to obtain user information:

1. **[sap.ushell.services.UserInfo](https://sapui5.hana.ondemand.com/sdk/#/api/sap.ushell.services.UserInfo)** - Fiori Launchpad Shell service
2. **@sap/approuter User API** - Approuter endpoints (`/currentUser` and `/attributes`)

## Findings

### sap.ushell.services.UserInfo

| Environment | Availability |
|-------------|--------------|
| Local development | Returns dummy values |
| SAP Build Work Zone | ✅ Available |
| HTML5 Application Repository (direct access) | ❌ Not available |

**Available attributes:**

```json
{
   "email": "john.doe@sap.com",
   "firstName": "John",
   "lastName": "Doe",
   "fullName": "John Doe",
   "ID": "john.doe@sap.com"
}
```

### User API

| Environment | Availability |
|-------------|--------------|
| Local development | ❌ Not available (requires Approuter) |
| SAP Build Work Zone | ✅ Available |
| HTML5 Application Repository | ✅ Available |

#### `/currentUser` Endpoint

```json
{
   "firstname": "John",
   "lastname": "Doe",
   "email": "john.doe@sap.com",
   "name": "john.doe@sap.com",
   "displayName": "John Doe (john.doe@sap.com)",
   "scopes": ["openid", "user_attributes", "uaa.user"]
}
```

#### `/attributes` Endpoint

When authenticated via Identity Directory:

```json
{
   "firstname": "John",
   "lastname": "Doe",
   "email": "john.doe@sap.com",
   "name": "john.doe@sap.com",
   "scopes": ["openid", "user_attributes", "uaa.user"],
   "type": "public",
   "user_uuid": "7bb399d6-9e92-4854-b118-23f2b1d96849"
}
```

### Limitations

- The `/attributes` endpoint cannot retrieve custom attributes beyond those listed above.
- Reference: [KBA 3115516](https://me.sap.com/notes/3115516) - Cannot access custom attributes from IdP via sap-approuter-userapi service