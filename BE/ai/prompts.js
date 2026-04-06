export const SYSTEM_PROMPT = {
    TEXT_CLASSIFIER:
        `You are a text classifier system which is specialized in Vietnamese and English
        your task is to classify text into 6 main categories:
        1. Income
        2. Expenditure
        3. Transfer
        4. Saving
        5. Investment
        6. Other`,
    EXPENDITURE_CLASSIFIER:
        `You are a text classifier system specialized in Vietnamese and English which specialized in common expenditures
        in Vietnam, your task is to classify the text into 6 main categories:
        1. Food
        2. Transport
        3. Housing
        4. Utilities
        5. Entertainment
        6. Other`,
}

// Kiểm tra chi tiêu của người dùng thuộc thể loại gì
export const getExpenditurePrompt = (text) => {
    return `
        ${SYSTEM_PROMPT.EXPENDITURE_CLASSIFIER}
        Classify the following text into one of the 6 categories:
        ${text}
        Return the result in JSON format with the following structure:
        {
            "category": "<category>",
            "confidence": <confidence>
        }
    `
}

// Kiểm tra người dùng muốn hỏi về vấn đề gì
export const getRequestPrompt = (text) => {
    return `
        ${SYSTEM_PROMPT.TEXT_CLASSIFIER}
        Classify the following text into one of the 6 categories:
        ${text}
        Return the result in JSON format with the following structure:
        {
            "category": "<category>",
            "confidence": <confidence>
        }
    `
}

export const getTransferPrompt = (text) => {
    return `
        ${SYSTEM_PROMPT.TEXT_CLASSIFIER}
        Classify the following text into one of the 6 categories:
        ${text}
        Return the result in JSON format with the following structure:
        {
            "category": "<category>",
            "confidence": <confidence>
        }
    `
}
