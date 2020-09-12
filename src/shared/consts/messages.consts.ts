interface DependenciesMessagesProps {
    [key: string]: string
}

export const TABLE_EMPTY_MESSAGE = 'Нет данных'
export const IMPORT_SUCCESS_MESSAGE = 'Импорт завершен!'
export const EVENT_PUBLISH_SUCCESS_MESSAGE = 'Мероприятие успешно опубликовано!'
export const EVENT_SAVE_SUCCESS_MESSAGE = 'Мероприятие успешно сохранено!'
export const JOB_PROFILE_CREATE_SUCCESS_MESSAGE = 'Профиль успешно добавлен!'
export const JOB_PROFILE_UPDATE_SUCCESS_MESSAGE = 'Профиль успешно обновлен!'
export const QUESTIONNAIRES_CONSTRUCTOR_CREATE_SUCCESS_MESSAGE =
    'Шаблон успешно добавлен!'
export const DEPENDENCIES_MESSAGES: DependenciesMessagesProps = {
    questions:
        'При изменении данного поля, список вопросов придется заполнять заново...',
}
