import {ICatalog} from "../catalog/IСatalog";

export const catalogList: ICatalog[] = [
    {
        "id": 1,
        "title": "Вхідні документи",
        "description": "Реєстрація вхідних документів.",
        "path":"/registration/incoming"
    },
    {
        "id": 2,
        "title": "Звернення громадян",
        "description": "Реєстрація звернень громадян.",
        "path":"/registration/citizen"
    },
    {
        "id": 3,
        "title": "Вихідні документи",
        "description": "Реєстрація вихідних документів.",
        "path":"/registration/outgoing"
    },
    {
        "id": 4,
        "title": "Внутрішні документи",
        "description": "Реєстрація внутрішніх документів.",
        "path":"/registration/inner"
    },
    ]
