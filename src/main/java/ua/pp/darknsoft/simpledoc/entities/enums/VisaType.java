package ua.pp.darknsoft.simpledoc.entities.enums;

import lombok.Getter;

@Getter
public enum VisaType {

    SIGNATORY("signatory"), APPROVER("approver"), EXECUTANT("executant");
    private final String value;

    VisaType(String value) {
        this.value = value;
    }
}
