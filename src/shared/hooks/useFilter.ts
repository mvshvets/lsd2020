import { useCallback, useState } from 'react'

/**
 * Хук для фильтрации
 */
export const useFilter = (): [boolean, () => void] => {
    /**
     * Видимость формы фильтрации
     */
    const [visibleFilter, setVisibleFilter] = useState<boolean>(false)

    /**
     * Переключение видимости формы фильтрации
     */
    const triggerFilterVisibility = useCallback(() => {
        setVisibleFilter(!visibleFilter)
    }, [visibleFilter])

    return [visibleFilter, triggerFilterVisibility]
}
