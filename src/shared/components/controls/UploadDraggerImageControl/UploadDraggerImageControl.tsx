import './UploadDraggerImageControl.scss'

import React, { useCallback, useState } from 'react'
import { IconsAdapter } from 'shared/components'
import { RcFile, UploadChangeParam } from 'antd/lib/upload/interface'
import { UPLOAD_IMAGE_PLACEHOLDER_DEFAULT } from 'shared/consts'
import { message, Upload } from 'antd'

import { UploadDraggerImageControlProps } from './UploadDraggerImageControl.model'

/**
 * Декоратор для `Upload.Dragger` от `antd`, принимает все теже `props`
 */
export const UploadDraggerImageControl: React.FC<UploadDraggerImageControlProps> = React.memo(
    ({ placeholder, onChange, ...restProps }) => {
        const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(
            null
        )

        /**
         * Превью загружаемого изображения
         * @param info информация о изображении
         */
        const handleChange = useCallback(
            (info: UploadChangeParam) => {
                const reader = new FileReader()
                reader.addEventListener('load', () => {
                    setImageUrl(reader.result)
                })
                reader.readAsDataURL(info.file.originFileObj as Blob)
                if (onChange) onChange(info)
            },
            [onChange]
        )

        /**
         * Валидация загружаемого баннера
         * @param file добавляемый файл
         */
        const beforeUploadBanner = useCallback((file: RcFile) => {
            const isJpgOrPng =
                file.type === 'image/jpeg' || file.type === 'image/png'
            if (!isJpgOrPng)
                message.warning(
                    'Вы можете загрузить только JPG/PNG файлы!'
                )
            return isJpgOrPng
        }, [])

        return (
            <div className="upload-dragger-control">
                <Upload.Dragger
                    accept="image/*"
                    showUploadList={false}
                    beforeUpload={beforeUploadBanner}
                    onChange={handleChange}
                    {...restProps}
                >
                    {imageUrl ? (
                        <img
                            src={imageUrl as string}
                            alt="Изображение"
                            style={{ width: '100%' }}
                        />
                    ) : (
                        <>
                            <IconsAdapter
                                iconType="PictureOutlined"
                                className="img-upload"
                            />
                            <span>
                                {placeholder ||
                                    UPLOAD_IMAGE_PLACEHOLDER_DEFAULT}
                            </span>
                        </>
                    )}
                </Upload.Dragger>
            </div>
        )
    }
)
