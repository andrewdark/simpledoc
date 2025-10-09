package ua.pp.darknsoft.simpledoc.entities.enums;

import lombok.Getter;

@Getter
public enum PublisherType {

    SIGNATORY("signatory"), APPROVER("approver"), EXECUTANT("executant");
    private final String value;

    PublisherType(String value) {
        this.value = value;
    }
}
