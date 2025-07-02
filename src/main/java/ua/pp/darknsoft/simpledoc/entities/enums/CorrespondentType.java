package ua.pp.darknsoft.simpledoc.entities.enums;

public enum CorrespondentType {
    /**
     * Входящий от организации
     */
    INCOMING_ORGANIZATION("incomingOrganization"),

    /**
     * Входящий от гражданина
     */
    INCOMING_CITIZEN("incomingCitizen"),

    /**
     * Сопроводительный
     */
    COVER_LETTER("coverLetter"),

    /**
     * Исходящий к организации
     */
    OUTGOING_ORGANIZATION("outgoingOrganization"),

    /**
     * Исходящий к гражданину
     */
    OUTGOING_CITIZEN("outgoingCitizen");

    private final String value;

    CorrespondentType(String value) {
        this.value = value;
    }
}
