sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';

    return {

        onPrint: function (oEvent) {
            let oApi = this.templateBaseExtension.getExtensionAPI()
            for (let oContexts of oApi.getSelectedContexts()) {
                let oObject = oContexts.getObject()
                let oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation"); // get a handle on the global XAppNav service
                let hash = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
                    target: {
                        semanticObject: "maintprint",
                        action: "display"
                    },
                    params: {
                        "MaintenanceDocument": oObject.MaintenanceDocument,
                        "DocumentType": oObject.DocumentType
                    }

                })) || ""; // generate the Hash to display a Supplier

                sap.m.URLHelper.redirect(window.location.href.split('#')[0] + hash, true)
            }
        },

        onClose: function (oEvent) {
            oEvent.getSource().getParent().close();
            oEvent.getSource().getParent().destroy();
            this.getView().removeAllDependents();
        },

        createDialog: function (oView, sFragment, sBindingPath) {
            return sap.ui.core.Fragment.load({
                id: oView.getId(),
                name: sFragment,
                controller: this
            }).then(function (oDialog) {
                oDialog.oPopup.setModal(false)
                oDialog.bindElement(sBindingPath)
                oView.addDependent(oDialog);
                return oDialog;
            }.bind(this));
        }
    };
});