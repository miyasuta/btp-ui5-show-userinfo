import Controller from "sap/ui/core/mvc/Controller";
import SimpleForm from "sap/ui/layout/form/SimpleForm";
import JSONModel from "sap/ui/model/json/JSONModel";
import Container from "sap/ushell/Container";
import UserInfo from "sap/ushell/services/UserInfo";

/**
 * @namespace miyasuta.showuserinfo.controller
 */
export default class User extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        this.getUserInfo();
        this.getUserViaApi();
        this.getUserAttributes();
    }

    private async getUserInfo(): Promise<void> {
        const userInfo = await Container.getServiceAsync("UserInfo") as UserInfo;
        const userData = await userInfo.getShellUserInfo();
        this.getView()?.setModel(new JSONModel(userData), "userInfo");
        const userForm = this.getView()?.byId("userInfoForm") as SimpleForm;
        userForm.bindElement("userInfo>/");        
    }

    private async getUserViaApi(): Promise<void> {
        const url = this.getBaseURL() + "/user-api/currentUser";

        try {
            const response = await fetch(url);
            if (!response.ok) {
                this.setMockUserData();
                return;
            }
            const currentUser = await response.json();
            this.getView()?.setModel(new JSONModel(currentUser), "userApiInfo");
            const userForm = this.getView()?.byId("currentUserForm") as SimpleForm;
            userForm.bindElement("userApiInfo>/");     

        } catch (error) {
            // Fallback for local testing
            this.setMockUserData();
        }        

    }

    private async getUserAttributes(): Promise<void> {
        const url = this.getBaseURL() + "/user-api/attributes";

        try {
            const response = await fetch(url);
            if (!response.ok) {
                return;
            }
            const attributes = await response.json();
            this.getView()?.setModel(new JSONModel(attributes), "userAttributes");
            const attrForm = this.getView()?.byId("userAttributesForm") as SimpleForm;
            attrForm.bindElement("userAttributes>/");
        } catch (error) {
            // Fallback for local testing
            console.log("Failed to fetch user attributes:", error);
        }
    }

    private setMockUserData(): void {
        const mockUser = {
            firstname: "Dummy",
            lastname: "User",
            email: "dummy.user@com",
            name: "dummy.user@com",
            displayName: "Dummy User (dummy.user@com)",
            scopes: ["test.scope1", "test.scope2"]
        };
        this.getView()?.setModel(new JSONModel(mockUser), "userApiInfo");
        const userForm = this.getView()?.byId("currentUserForm") as SimpleForm;
        userForm.bindElement("userApiInfo>/");          
    }

    private getBaseURL(): string {
        const component = this.getOwnerComponent();
        const appId = component?.getManifestEntry("/sap.app/id"); 
        const appPath = appId.replace(/\./g, "/"); 
        return sap.ui.require.toUrl(appPath); 
    }

}