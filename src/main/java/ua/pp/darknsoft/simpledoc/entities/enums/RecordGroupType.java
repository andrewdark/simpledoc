package ua.pp.darknsoft.simpledoc.entities.enums;

import lombok.Getter;

@Getter
public enum RecordGroupType {
    NODE("node"), INCOMING("incoming"), OUTGOING("outgoing"), CITIZEN("citizen"), INNER("inner");

    private final String value;

    RecordGroupType(String value) {
        this.value = value;
    }

}
