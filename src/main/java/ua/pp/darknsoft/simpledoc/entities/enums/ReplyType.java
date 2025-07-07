package ua.pp.darknsoft.simpledoc.entities.enums;

import lombok.Getter;

@Getter
public enum ReplyType {
    FULL_REPLY("full_reply"), PARTIAL_REPLY("partial_reply");

    private final String value;

    ReplyType(String value) {
        this.value = value;
    }
}
