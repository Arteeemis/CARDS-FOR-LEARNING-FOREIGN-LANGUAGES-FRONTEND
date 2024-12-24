import {T_Card} from "src/modules/types.ts";

export const CardMocks:T_Card[] = [
    {
        pk: 1,
        status: "active",
        word: "serendipity",
        word_level: "C2",
        word_language: "English",
        word_class: "noun",
        word_description: "The occurrence of events by chance in a happy or beneficial way.",
        word_translation: "счастливая случайность",
        word_example: "Finding that old photograph was pure serendipity.",
        word_synonyms: "chance, coincidence, fluke",
        word_image: "https://example.com/images/serendipity.jpg"
    },
    {
        pk: 2,
        status: "active",
        word: "ephemeral",
        word_level: "B1",
        word_language: "English",
        word_class: "adjective",
        word_description: "Lasting for a very short time.",
        word_translation: "мимолетный",
        word_example: "The beauty of the sunset was ephemeral, fading within minutes.",
        word_synonyms: "transient, fleeting, short-lived",
        word_image: "https://example.com/images/ephemeral.jpg"
    },
    {
        pk: 3,
        status: "inactive",
        word: "sonder",
        word_level: "C1",
        word_language: "English",
        word_class: "noun",
        word_description: "The realization that each random passerby is living a life as vivid and complex as your own.",
        word_translation: "сондер (осознание)",
        word_example: "In the crowded street, she felt a moment of sonder as she watched the people around her.",
        word_synonyms: "empathy, awareness, understanding",
        word_image: "https://example.com/images/sonder.jpg"
    },
    {
        pk: 4,
        status: "active",
        word: "quintessential",
        word_level: "C1",
        word_language: "English",
        word_class: "adjective",
        word_description: "Representing the most perfect or typical example of a quality or class.",
        word_translation: "квинтэссенция",
        word_example: "She is the quintessential teacher, dedicated and passionate about her students.",
        word_synonyms: "typical, ideal, exemplary",
        word_image: "https://example.com/images/quintessential.jpg"
    }
]